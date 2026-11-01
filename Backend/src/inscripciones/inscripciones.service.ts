import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import QRCode from 'qrcode';
import 'multer';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { SubirComprobanteDto } from './dto/subir-comprobante.dto';
import { GuardarAsistenciaDto } from './dto/guardar-asistencia.dto';
import { ActualizarParticipanteDto } from './dto/actualizar-participante.dto';

const CODIGO_TIPO: Record<string, number> = {
  'Participante general': 1,
  'Estudiante': 2,
  'Docente': 3,
};

//  - congreso:    ESCALA (genera referencia bancaria)
//  - estudiantil: ARGOS  (sin referencia bancaria)
type Perfil = 'congreso' | 'estudiantil';
const PERFIL_POR_EVENTO: Record<number, Perfil> = {
  4: 'congreso',
  5: 'estudiantil',
};

// iguales no importa de que formulario vengan
interface DatosInscripcion {
  nombre: string;
  institucion: string;
  carrera: string;
  tipoCodigo: number;
  estadoProcedencia: string | null;
  contactoNombre: string | null;
  contactoTelefono: string | null;
  medioDifusion: string | null;
  tallaCamisa: string | null;
  semestre: string | null;
  taller: string | null;
  visitaEmpresa: string | null;
  nss: string | null;
}

// Opciones del código QR del folio. Nivel de corrección "M" (aguanta
// ~15% de daño) y margen de 2 módulos para que la pistola lo lea fácil.
const OPCIONES_QR = {
  errorCorrectionLevel: 'M',
  margin: 2,
  width: 320,
} as const;

@Injectable()
export class InscripcionesService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  // =====================================================
  // HELPERS — referencia bancaria
  // =====================================================

  private async siguienteConsecutivoAnual(anio: number): Promise<number> {
    const contador = await this.prisma.contador_referencia.upsert({
      where: { anio },
      create: { anio, ultimo: 1 },
      update: { ultimo: { increment: 1 } },
    });
    return contador.ultimo;
  }

  private construirReferencia(tipoCodigo: number, anioCompleto: number, consecutivo: number): string {
    const anio = anioCompleto.toString().slice(-2);
    const ite = '1';
    const consecutivoStr = consecutivo.toString().padStart(6, '0');
    return `${anio}${ite}${tipoCodigo}${consecutivoStr}`;
  }

  // =====================================================
  // HELPERS — validación y normalización
  // =====================================================

  private sanitizarTelefono(valor: string, maxLength: number, nombreCampo: string): string {
    const soloDigitos = valor.replace(/\D/g, '');

    if (soloDigitos.length > maxLength) {
      throw new BadRequestException(
        `${nombreCampo} no puede tener más de ${maxLength} dígitos.`,
      );
    }

    return soloDigitos;
  }

  private requerir(valor: string | undefined, campo: string): string {
    const limpio = valor?.trim();
    if (!limpio) throw new BadRequestException(`El campo "${campo}" es obligatorio.`);
    return limpio;
  }

  private nombreCompleto(dto: CreateInscripcionDto): string {
    return [dto.nombre, dto.apellidoPaterno, dto.apellidoMaterno]
      .map((s) => s?.trim())
      .filter(Boolean)
      .join(' ');
  }

  private institucionFinal(dto: CreateInscripcionDto): string {
    return dto.institucion === 'Otro'
      ? dto.otraInstitucion?.trim() || 'Otro'
      : dto.institucion;
  }

  private carreraFinal(dto: CreateInscripcionDto): string {
    return dto.carrera === 'Otro'
      ? dto.otraCarrera?.trim() || 'Otro'
      : dto.carrera;
  }

  private normalizarCongreso(dto: CreateInscripcionDto): DatosInscripcion {
    const tipo = this.requerir(dto.tipoParticipacion, 'tipo de participación');
    const medio = this.requerir(dto.comoSeEntero, 'cómo se enteró');
    this.requerir(dto.apellidoMaterno, 'apellido materno');

    if (!(tipo in CODIGO_TIPO)) {
      throw new BadRequestException('Tipo de participación inválido.');
    }

    return {
      nombre: this.nombreCompleto(dto),
      institucion: this.institucionFinal(dto),
      carrera: this.carreraFinal(dto),
      tipoCodigo: CODIGO_TIPO[tipo],
      estadoProcedencia: this.requerir(dto.estado, 'estado de procedencia'),
      contactoNombre: this.requerir(dto.contactoEmergenciaNombre, 'contacto de emergencia'),
      contactoTelefono: this.sanitizarTelefono(
        this.requerir(dto.contactoEmergenciaTelefono, 'teléfono de emergencia'),
        15,
        'El teléfono del contacto de emergencia',
      ),
      medioDifusion: medio === 'Otro' ? dto.otroMedio?.trim() || 'Otro' : medio,
      tallaCamisa: null,
      semestre: null,
      taller: null,
      visitaEmpresa: null,
      nss: null,
    };
  }

  // Turno de un taller o visita según el sufijo de su nombre en la tabla
  // "taller": "(matutino)", "(vespertino)" o "(vespertino II)".
  // Si el nombre no trae turno, devuelve null y no se bloquea nada.
  private turnoDe(nombre: string): 'matutino' | 'vespertino' | null {
    const match = /\((matutino|vespertino)/i.exec(nombre);
    return match ? (match[1].toLowerCase() as 'matutino' | 'vespertino') : null;
  }

  private normalizarEstudiantil(dto: CreateInscripcionDto): DatosInscripcion {
    const taller = this.requerir(dto.taller, 'taller');
    const visitaEmpresa = this.requerir(dto.visitaEmpresa, 'visita industrial');

    const turnoTaller = this.turnoDe(taller);
    if (turnoTaller && turnoTaller === this.turnoDe(visitaEmpresa)) {
      throw new BadRequestException(
        'El taller y la visita industrial no pueden estar en el mismo turno. ' +
          'Si tu taller es matutino, elige una visita vespertina, y viceversa.',
      );
    }

    // NSS del IMSS: obligatorio, 11 dígitos (se aceptan espacios o guiones
    // al escribirlo). La BD rechaza cualquier valor que no sean 11 dígitos,
    // por eso aquí nunca se manda una cadena vacía.
    const nss = this.requerir(dto.nss, 'NSS').replace(/[\s-]/g, '');
    if (!/^\d{11}$/.test(nss)) {
      throw new BadRequestException('El NSS debe tener exactamente 11 dígitos.');
    }

    return {
      nombre: this.nombreCompleto(dto),
      institucion: this.institucionFinal(dto),
      carrera: this.carreraFinal(dto),
      tipoCodigo: CODIGO_TIPO['Estudiante'],
      estadoProcedencia: null,
      contactoNombre: null,
      contactoTelefono: null,
      medioDifusion: null,
      tallaCamisa: this.requerir(dto.tallaPlayera, 'talla de playera'),
      semestre: this.requerir(dto.semestre, 'semestre'),
      taller,
      visitaEmpresa,
      nss,
    };
  }

  // =====================================================
  // HELPERS — cupo de talleres y visitas (ARGOS)
  // =====================================================
  // Los talleres y las visitas viven en la misma tabla "taller".
  // Un lugar cuenta a toda persona registrada (sin importar el estado
  // de su pago) que tenga ese nombre en "taller" o en "visita_empresa".
  // Si "capacidad" viene vacía, el lugar no tiene límite.

  private async verificarCupo(
    db: Pick<PrismaService, 'taller' | 'participantes'>,
    eventoId: number,
    nombre: string,
    tipo: 'taller' | 'visita',
  ): Promise<void> {
    const lugar = await db.taller.findFirst({ where: { evento: eventoId, nombre } });

    if (!lugar) {
      throw new BadRequestException(
        tipo === 'taller'
          ? `El taller "${nombre}" no existe.`
          : `La visita industrial "${nombre}" no existe.`,
      );
    }

    if (lugar.capacidad == null) return;

    const ocupados = await db.participantes.count({
      where: {
        evento: eventoId,
        OR: [{ taller: nombre }, { visita_empresa: nombre }],
      },
    });

    if (ocupados >= lugar.capacidad) {
      throw new ConflictException(
        tipo === 'taller'
          ? `El taller "${nombre}" ya no tiene cupo. Elige otro taller.`
          : `La visita industrial "${nombre}" ya no tiene cupo. Elige otra visita.`,
      );
    }
  }

  // La columna nss es UNIQUE: se revisa antes de insertar para responder
  // con un mensaje claro en lugar de un error de base de datos.
  private async verificarNssLibre(
    db: Pick<PrismaService, 'participantes'>,
    nss: string,
    excluirFolio?: string,
  ): Promise<void> {
    const existe = await db.participantes.findFirst({
      where: {
        nss,
        ...(excluirFolio ? { NOT: { folio: excluirFolio } } : {}),
      },
      select: { folio: true },
    });

    if (existe) {
      throw new ConflictException(
        'Ese NSS ya está registrado. Si crees que es un error, contacta al comité organizador.',
      );
    }
  }

  // =====================================================
  // PÚBLICO — registro
  // =====================================================

  async crear(dto: CreateInscripcionDto, eventoId: number) {
    if (!dto.consentimiento) {
      throw new BadRequestException('Debes aceptar el consentimiento para registrarte.');
    }

    const perfil = PERFIL_POR_EVENTO[eventoId] ?? 'congreso';
    const datos =
      perfil === 'estudiantil'
        ? this.normalizarEstudiantil(dto)
        : this.normalizarCongreso(dto);

    const telefonoLimpio = this.sanitizarTelefono(dto.telefono, 10, 'El teléfono');

    const [genero, estadoPendiente, evento] = await Promise.all([
      this.prisma.genero.findFirst({ where: { nombre: dto.sexo } }),
      this.prisma.estado.findFirst({ where: { nombre: 'Pendiente' } }),
      this.prisma.evento.findUnique({ where: { id: eventoId } }),
    ]);

    if (!genero) throw new NotFoundException(`No existe el género "${dto.sexo}" en el catálogo`);
    if (!estadoPendiente) throw new NotFoundException('No existe el estado "Pendiente" en el catálogo');
    if (!evento) throw new NotFoundException('El evento no existe');

    // genera referencia bancaria. Se hace después de validar
    // pa no gastar un consecutivo si registro falla.
    let referencia: string | null = null;
    if (perfil === 'congreso') {
      const anioCompleto = new Date().getFullYear();
      const consecutivo = await this.siguienteConsecutivoAnual(anioCompleto);
      referencia = this.construirReferencia(datos.tipoCodigo, anioCompleto, consecutivo);
    }

    const crearRegistro = (db: Pick<PrismaService, 'participantes'>) =>
      db.participantes.create({
        data: {
          evento: eventoId,
          nombre: datos.nombre,
          genero: genero.id,
          edad: dto.edad,
          correo_electronico: dto.email,
          telefono: telefonoLimpio,
          matricula: dto.numeroControl?.trim() || '0',
          institucion: datos.institucion,
          carrera: datos.carrera,
          tipo_participacion: datos.tipoCodigo,
          referencia_bancaria: referencia,
          estado: estadoPendiente.id,
          estado_procedencia: datos.estadoProcedencia,
          contacto_emergencia_nombre: datos.contactoNombre,
          contacto_emergencia_telefono: datos.contactoTelefono,
          medio_difusion: datos.medioDifusion,
          talla_camisa: datos.tallaCamisa,
          semestre: datos.semestre,
          taller: datos.taller,
          visita_empresa: datos.visitaEmpresa,
          nss: datos.nss,
          consentimiento: dto.consentimiento,
          monto: evento.costo ?? 0,
        },
      });

    // ARGOS: se revisa el cupo del taller y de la visita justo antes de
    // inscribir. El candado evita que dos personas tomen el último lugar
    // al mismo tiempo (se libera solo al terminar la transacción).
    const participante =
      perfil === 'estudiantil'
        ? await this.prisma.$transaction(async (tx) => {
            await tx.$executeRaw`SELECT pg_advisory_xact_lock(${eventoId}::bigint)`;
            await this.verificarNssLibre(tx, datos.nss!);
            await this.verificarCupo(tx, eventoId, datos.taller!, 'taller');
            await this.verificarCupo(tx, eventoId, datos.visitaEmpresa!, 'visita');
            return crearRegistro(tx);
          })
        : await crearRegistro(this.prisma);

    // El QR contiene únicamente el folio. Si falla al generarse, el
    // registro ya quedó guardado, así que se responde con qr: null.
    const qr = await this.generarQrDataUrl(participante.folio);

    // El NSS no se devuelve en la respuesta pública del registro.
    const { nss: _nss, ...registro } = participante;

    return { ...registro, qr };
  }

  // =====================================================
  // PUBLICO — cupos disponibles (talleres y visitas)
  // =====================================================

  async obtenerCupos(eventoId: number) {
    const [lugares, inscritos] = await Promise.all([
      this.prisma.taller.findMany({
        where: { evento: eventoId },
        select: { nombre: true, capacidad: true },
      }),
      this.prisma.participantes.findMany({
        where: { evento: eventoId },
        select: { taller: true, visita_empresa: true },
      }),
    ]);

    const ocupados = new Map<string, number>();
    for (const p of inscritos) {
      for (const nombre of [p.taller, p.visita_empresa]) {
        if (nombre) ocupados.set(nombre, (ocupados.get(nombre) ?? 0) + 1);
      }
    }

    return lugares.map((l) => {
      const usados = ocupados.get(l.nombre) ?? 0;
      return {
        nombre: l.nombre,
        capacidad: l.capacidad,
        ocupados: usados,
        disponibles: l.capacidad == null ? null : Math.max(l.capacidad - usados, 0),
      };
    });
  }

  // =====================================================
  // PUBLICO — código QR del folio
  // =====================================================
  // El QR codifica solo el folio, como texto plano. Así la pistola lo
  // "escribe" igual que si lo tecleara y handleScan lo compara con el folio.

  // Imagen en base64 (data URL) para usar directo en <img :src="...">
  private async generarQrDataUrl(folio: string): Promise<string | null> {
    try {
      return await QRCode.toDataURL(folio.trim(), OPCIONES_QR);
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : String(e);
      console.error('No se pudo generar el QR del folio:', mensaje);
      return null;
    }
  }

  // PNG para el endpoint GET .../qr/:folio. Solo genera QR de folios que
  // existen en este evento, para que no sirva como generador de QR en general.
  async obtenerQrPng(eventoId: number, folio: string): Promise<Buffer> {
    const participante = await this.prisma.participantes.findFirst({
      where: { evento: eventoId, folio },
      select: { folio: true },
    });

    if (!participante) {
      throw new NotFoundException('No se encontró una inscripción con ese folio.');
    }

    return QRCode.toBuffer(participante.folio.trim(), OPCIONES_QR);
  }

  // =====================================================
  // PUBLICO — consultas del participante
  // =====================================================

  async buscarPorCorreo(eventoId: number, correo: string) {
    const participante = await this.prisma.participantes.findFirst({
      where: {
        evento: eventoId,
        correo_electronico: { equals: correo, mode: 'insensitive' },
      },
      include: { evento_participantes_eventoToevento: true },
    });

    if (!participante) {
      throw new NotFoundException(
        'No encontramos ningún registro asociado a este correo electrónico.',
      );
    }

    return {
      folio: participante.folio,
      nombre: participante.nombre,
      correo: participante.correo_electronico,
      evento: participante.evento_participantes_eventoToevento.nombre,
      fechaRegistro: participante.fecha_registro
        ? new Date(participante.fecha_registro).toLocaleDateString('es-MX')
        : null,
      qr: await this.generarQrDataUrl(participante.folio),
    };
  }

  async buscarPorFolio(eventoId: number, folio: string) {
    const participante = await this.prisma.participantes.findFirst({
      where: { evento: eventoId, folio },
      include: { tipo_participante: true },
    });

    if (!participante) {
      throw new NotFoundException('No se encontró una inscripción con ese folio.');
    }

    return {
      folio: participante.folio,
      referencia_bancaria: participante.referencia_bancaria,
      nombre_completo: participante.nombre,
      control: participante.matricula,
      institucion: participante.institucion,
      tipo_participacion: participante.tipo_participante?.nombre ?? '',
      correo: participante.correo_electronico,
      whatsapp: participante.telefono,
    };
  }

  async buscarPorReferencia(referencia: string) {
    const participante = await this.prisma.participantes.findUnique({
      where: { referencia_bancaria: referencia },
      include: { estado_participantes_estadoToestado: true },
    });

    if (!participante) {
      throw new NotFoundException('No se encontró ningún pago asociado a este folio.');
    }

    const estadoNombre = participante.estado_participantes_estadoToestado?.nombre ?? '';

    let estado = 'en_revision';
    if (estadoNombre === 'Confirmado') estado = 'aprobado';
    else if (estadoNombre === 'Rechazada') estado = 'rechazado';

    return {
      referencia: participante.referencia_bancaria,
      nombre: participante.nombre,
      correo: participante.correo_electronico,
      monto: participante.monto ? Number(participante.monto) : null,
      fechaPago: participante.fecha_comprobante
        ? new Date(participante.fecha_comprobante).toLocaleDateString('es-MX')
        : null,
      estado,
    };
  }

  // =====================================================
  // PUBLICO — comprobante de pago
  // =====================================================

  async subirComprobante(eventoId: number, dto: SubirComprobanteDto, file: Express.Multer.File) {
    const participante = await this.prisma.participantes.findFirst({
      where: {
        evento: eventoId,
        referencia_bancaria: dto.referencia,
        correo_electronico: dto.correo,
      },
    });

    if (!participante) {
      throw new NotFoundException('No se encontró un registro con esa referencia y correo.');
    }

    const evento = await this.prisma.evento.findUnique({ where: { id: eventoId } });

    let referenciaCoincide = false;
    let montoCoincide = false;
    let textoDetectado = '';

    const esImagen = file.mimetype.startsWith('image/');

    if (esImagen) {
      try {
        const imagenProcesada = await sharp(file.buffer)
          .grayscale()
          .normalize()
          .sharpen()
          .toBuffer();

        const worker = await createWorker('spa');
        const { data } = await worker.recognize(imagenProcesada);
        await worker.terminate();

        textoDetectado = data.text;
        referenciaCoincide = textoDetectado.includes(dto.referencia);

        const montoEsperado = Number(evento?.costo ?? 0);
        const patronesMonto = [
          montoEsperado.toFixed(2),
          montoEsperado.toFixed(0),
          montoEsperado.toLocaleString('es-MX'),
        ];
        montoCoincide = patronesMonto.some((p) => textoDetectado.includes(p));
      } catch (ocrError) {
        const mensaje = ocrError instanceof Error ? ocrError.message : String(ocrError);
        console.error('OCR falló, se enviará a revisión manual:', mensaje);
        referenciaCoincide = false;
        montoCoincide = false;
      }
    }

    const extension = file.originalname.split('.').pop();
    const rutaArchivo = `${eventoId}/${dto.referencia}.${extension}`;

    const { error: uploadError } = await this.supabase.client.storage
      .from('comprobantes')
      .upload(rutaArchivo, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new BadRequestException('No se pudo subir el comprobante: ' + uploadError.message);
    }

    const validadoAutomaticamente = referenciaCoincide && montoCoincide;
    const nombreEstado = validadoAutomaticamente ? 'Confirmado' : 'En revisión';
    const estadoFinal = await this.prisma.estado.findFirst({ where: { nombre: nombreEstado } });

    await this.prisma.participantes.update({
      where: { folio: participante.folio },
      data: {
        comprobante_pago: rutaArchivo,
        estado: estadoFinal?.id,
        metodo_validacion: validadoAutomaticamente ? 'automatico' : null,
        fecha_comprobante: new Date(),
      },
    });

    return {
      folio: participante.folio,
      validadoAutomaticamente,
      mensaje: validadoAutomaticamente
        ? 'Tu comprobante fue validado automáticamente.'
        : 'Tu comprobante fue recibido y está en revisión manual.',

      // TEMPORAL — PROBAR OCR Borrar
      debug: {
        referenciaCoincide,
        montoCoincide,
        montoEsperado: Number(evento?.costo ?? 0),
        textoCompleto: textoDetectado,
      },
    };
  }

  // =====================================================
  // ADMIN — participantes y pagos
  // =====================================================

  async listarParticipantes(eventoId: number) {
    const participantes = await this.prisma.participantes.findMany({
      where: { evento: eventoId },
      include: {
        tipo_participante: true,
        estado_participantes_estadoToestado: true,
      },
      orderBy: { participante_num: 'asc' },
    });

    const conAsistencia = await this.foliosConAsistencia(
      eventoId,
      participantes.map((p) => p.folio),
    );

    return Promise.all(participantes.map((p) => this.mapParticipante(p, conAsistencia)));
  }

  private async mapParticipante(p: any, conAsistencia: Set<string>) {
    const estadoNombre = p.estado_participantes_estadoToestado?.nombre ?? '';

    let payment = 'pending';
    if (estadoNombre === 'Confirmado') payment = 'approved';
    else if (estadoNombre === 'Rechazada') payment = 'rejected';
    else if (estadoNombre === 'En revisión') payment = 'in_review';

    const receiptName = p.comprobante_pago ? p.comprobante_pago.split('/').pop() : null;

    let receiptUrl: string | null = null;
    if (p.comprobante_pago) {
      const { data, error } = await this.supabase.client.storage
        .from('comprobantes')
        .createSignedUrl(p.comprobante_pago, 300);

      if (error) {
        console.error('Error al firmar comprobante:', p.comprobante_pago, error.message);
      }

      receiptUrl = data?.signedUrl ?? null;
    }

    return {
      id: p.folio,
      folio: p.folio,                         
      name: p.nombre,
      control: p.matricula,
      type: p.tipo_participante?.nombre ?? '',
      email: p.correo_electronico,
      payment,
      attended: conAsistencia.has(p.folio),    
      reference: p.referencia_bancaria,
      receiptName,
      receiptUrl,
      receiptDate: p.fecha_comprobante
        ? new Date(p.fecha_comprobante).toLocaleDateString('es-MX')
        : null,
      certificate: false,
      //ARGOOS  
      shirtSize: p.talla_camisa ?? null,
      semester: p.semestre ?? null,
      workshop: p.taller ?? null,
      industrialVisit: p.visita_empresa ?? null,
      nss: p.nss ?? null,
    };
  }

  async aprobarPago(eventoId: number, folio: string) {
    return this.cambiarEstadoPago(eventoId, folio, 'Confirmado');
  }

  async rechazarPago(eventoId: number, folio: string) {
    return this.cambiarEstadoPago(eventoId, folio, 'Rechazada');
  }

  private async cambiarEstadoPago(eventoId: number, folio: string, nombreEstado: string) {
    const participante = await this.prisma.participantes.findFirst({
      where: { evento: eventoId, folio },
    });

    if (!participante) {
      throw new NotFoundException('Participante no encontrado.');
    }

    const estado = await this.prisma.estado.findFirst({ where: { nombre: nombreEstado } });

    if (!estado) {
      throw new NotFoundException(`No existe el estado "${nombreEstado}" en el catálogo.`);
    }

    await this.prisma.participantes.update({
      where: { folio },
      data: { estado: estado.id, metodo_validacion: 'manual' },
    });

    return { folio, estado: nombreEstado };
  }
  
  // =====================================================
  // ADMIN — editar participante
  // =====================================================
  // Solo se modifica lo que llega en el body. Si cambia el taller o la
  // visita se valida el turno y el cupo de lo nuevo, con el mismo candado
  // que usa el registro. Lo que no cambia no se vuelve a validar, para que
  // corregir un nombre no falle porque el taller ya esté lleno.

  async actualizarParticipante(
    eventoId: number,
    folio: string,
    dto: ActualizarParticipanteDto,
  ) {
    const actual = await this.prisma.participantes.findFirst({
      where: { evento: eventoId, folio },
    });

    if (!actual) {
      throw new NotFoundException('Participante no encontrado.');
    }

    const data: {
      nombre?: string;
      matricula?: string;
      correo_electronico?: string;
      nss?: string;
      taller?: string;
      visita_empresa?: string;
    } = {};

    if (dto.nombre !== undefined) {
      const nombre = dto.nombre.trim();
      if (!nombre) {
        throw new BadRequestException('El nombre no puede quedar vacío.');
      }
      data.nombre = nombre;
    }

    if (dto.matricula !== undefined) {
      data.matricula = dto.matricula.trim() || '0';
    }

    if (dto.email !== undefined) {
      data.correo_electronico = dto.email.trim();
    }

    // NSS: 11 dígitos. Si viene vacío no se modifica (es obligatorio).
    const nssTexto = dto.nss?.trim();
    if (nssTexto) {
      const nss = nssTexto.replace(/[\s-]/g, '');
      if (!/^\d{11}$/.test(nss)) {
        throw new BadRequestException('El NSS debe tener exactamente 11 dígitos.');
      }
      if (nss !== actual.nss) data.nss = nss;
    }

    const tallerNuevo = dto.taller?.trim();
    const visitaNueva = dto.visitaEmpresa?.trim();
    const cambiaTaller = Boolean(tallerNuevo) && tallerNuevo !== actual.taller;
    const cambiaVisita = Boolean(visitaNueva) && visitaNueva !== actual.visita_empresa;

    if (cambiaTaller || cambiaVisita) {
      const tallerFinal = (cambiaTaller ? tallerNuevo : actual.taller) ?? '';
      const visitaFinal = (cambiaVisita ? visitaNueva : actual.visita_empresa) ?? '';

      const turnoTaller = this.turnoDe(tallerFinal);
      if (turnoTaller && turnoTaller === this.turnoDe(visitaFinal)) {
        throw new BadRequestException(
          'El taller y la visita industrial no pueden estar en el mismo turno.',
        );
      }

      if (cambiaTaller) data.taller = tallerNuevo!;
      if (cambiaVisita) data.visita_empresa = visitaNueva!;
    }

    if (Object.keys(data).length === 0) {
      return { folio, actualizado: false };
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${eventoId}::bigint)`;

      if (data.nss) await this.verificarNssLibre(tx, data.nss, folio);
      if (data.taller) await this.verificarCupo(tx, eventoId, data.taller, 'taller');
      if (data.visita_empresa) {
        await this.verificarCupo(tx, eventoId, data.visita_empresa, 'visita');
      }

      await tx.participantes.update({ where: { folio }, data });
    });

    return { folio, actualizado: true };
  }

  // =====================================================
  // ADMIN — asistencia
  // =====================================================

  private rangoDia(fecha: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha ?? '')) {
      throw new BadRequestException('Fecha inválida (usa AAAA-MM-DD).');
    }
    const inicio = new Date(`${fecha}T00:00:00.000Z`);
    if (isNaN(inicio.getTime())) throw new BadRequestException('Fecha inválida.');
    return { inicio, fin: new Date(inicio.getTime() + 86_400_000) };
  }

  private async objetivoAsistencia(eventoId: number, tipo: string, actividadId?: number) {
    if (tipo === 'evento') {
      return { evento: eventoId, taller: null, actividad: null };
    }
    if (tipo !== 'taller' && tipo !== 'actividad') {
      throw new BadRequestException('Tipo de asistencia inválido.');
    }
    if (!actividadId) throw new BadRequestException('Selecciona la actividad.');

    const id = BigInt(actividadId);

    if (tipo === 'taller') {
      const existe = await this.prisma.taller.findFirst({ where: { id, evento: eventoId } });
      if (!existe) throw new NotFoundException('El taller no existe en este evento.');
      return { evento: null, taller: id, actividad: null };
    }

    const existe = await this.prisma.actividad.findFirst({ where: { id, evento: eventoId } });
    if (!existe) throw new NotFoundException('La actividad no existe en este evento.');
    return { evento: null, taller: null, actividad: id };
  }

  async opcionesAsistencia(eventoId: number) {
    const [evento, talleres, actividades] = await Promise.all([
      this.prisma.evento.findUnique({ where: { id: eventoId } }),
      this.prisma.taller.findMany({ where: { evento: eventoId }, orderBy: { id: 'asc' } }),
      this.prisma.actividad.findMany({ where: { evento: eventoId }, orderBy: { id: 'asc' } }),
    ]);

    if (!evento) throw new NotFoundException('El evento no existe');

    // Los ids son BigInt: hay que convertirlos o JSON.stringify truena
    return {
      evento: { id: eventoId, nombre: evento.nombre },
      talleres: talleres.map((t) => ({ id: Number(t.id), nombre: t.nombre })),
      actividades: actividades.map((a) => ({ id: Number(a.id), nombre: a.nombre })),
    };
  }

  async obtenerAsistencia(
    eventoId: number,
    tipo: string,
    actividadId: number | undefined,
    fecha: string,
  ) {
    const objetivo = await this.objetivoAsistencia(eventoId, tipo, actividadId);
    const { inicio, fin } = this.rangoDia(fecha);

    const filas = await this.prisma.asistencia.findMany({
      where: { ...objetivo, fecha: { gte: inicio, lt: fin } },
      select: { participante: true },
    });

    return { presentes: filas.map((f) => f.participante.trim()) };
  }

  // Aplica solo los cambios de este dispositivo (agregar / quitar),
  // así varias pistolas pueden guardar sin pisarse entre sí.
  async guardarAsistencia(eventoId: number, dto: GuardarAsistenciaDto) {
    const objetivo = await this.objetivoAsistencia(eventoId, dto.tipo, dto.actividadId);
    const { inicio, fin } = this.rangoDia(dto.fecha);

    // Solo folios que pertenecen a este evento
    const validos = await this.prisma.participantes.findMany({
      where: { evento: eventoId, folio: { in: dto.agregar } },
      select: { folio: true },
    });
    const agregar = new Set(validos.map((p) => p.folio));
    const quitar = new Set(
      dto.quitar.map((f) => f.trim()).filter((f) => !agregar.has(f)),
    );

    return this.prisma.$transaction(async (tx) => {
      const existentes = await tx.asistencia.findMany({
        where: {
          ...objetivo,
          fecha: { gte: inicio, lt: fin },
          participante: { in: [...agregar, ...quitar] },
        },
        select: { id: true, participante: true },
      });

      const yaMarcados = new Set(existentes.map((e) => e.participante.trim()));
      const idsBorrar = existentes
        .filter((e) => quitar.has(e.participante.trim()))
        .map((e) => e.id);
      const nuevos = [...agregar].filter((f) => !yaMarcados.has(f));

      if (idsBorrar.length) {
        await tx.asistencia.deleteMany({ where: { id: { in: idsBorrar } } });
      }
      if (nuevos.length) {
        await tx.asistencia.createMany({
          data: nuevos.map((folio) => ({ participante: folio, fecha: inicio, ...objetivo })),
          skipDuplicates: true,
        });
      }

      return { agregados: nuevos.length, quitados: idsBorrar.length };
    });
  }

  // Folios con al menos una asistencia en este evento (general, taller o actividad)
  private async foliosConAsistencia(eventoId: number, folios: string[]): Promise<Set<string>> {
    if (!folios.length) return new Set();

    const [talleres, actividades] = await Promise.all([
      this.prisma.taller.findMany({ where: { evento: eventoId }, select: { id: true } }),
      this.prisma.actividad.findMany({ where: { evento: eventoId }, select: { id: true } }),
    ]);

    const filas = await this.prisma.asistencia.findMany({
      where: {
        participante: { in: folios },
        OR: [
          { evento: eventoId },
          { taller: { in: talleres.map((t) => t.id) } },
          { actividad: { in: actividades.map((a) => a.id) } },
        ],
      },
      select: { participante: true },
      distinct: ['participante'],
    });

    return new Set(filas.map((f) => f.participante.trim()));
  }
}