import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import 'multer';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { SubirComprobanteDto } from './dto/subir-comprobante.dto';

const CODIGO_TIPO: Record<string, number> = {
  'Participante general': 1,
  'Estudiante': 2,
  'Docente': 3,
};

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

  private construirReferencia(tipoParticipacion: string, anioCompleto: number, consecutivo: number): string {
    const anio = anioCompleto.toString().slice(-2);
    const ite = '1';
    const tipo = CODIGO_TIPO[tipoParticipacion].toString();
    const consecutivoStr = consecutivo.toString().padStart(6, '0');
    return `${anio}${ite}${tipo}${consecutivoStr}`;
  }

  // =====================================================
  // HELPERS - numero 
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

  // =====================================================
  // PÚBLICO — registro
  // =====================================================

  async crear(dto: CreateInscripcionDto, eventoId: number) {
    if (!dto.consentimiento) {
      throw new BadRequestException('Debes aceptar el consentimiento para registrarte.');
    }

    const anioCompleto = new Date().getFullYear();

    const [consecutivoRef, genero, estadoPendiente, evento] = await Promise.all([
      this.siguienteConsecutivoAnual(anioCompleto),
      this.prisma.genero.findFirst({ where: { nombre: dto.sexo } }),
      this.prisma.estado.findFirst({ where: { nombre: 'Pendiente' } }),
      this.prisma.evento.findUnique({ where: { id: eventoId } }),
    ]);

    if (!genero) throw new NotFoundException(`No existe el género "${dto.sexo}" en el catálogo`);
    if (!estadoPendiente) throw new NotFoundException('No existe el estado "Pendiente" en el catálogo');
    if (!evento) throw new NotFoundException('El evento no existe');

    const referencia = this.construirReferencia(dto.tipoParticipacion, anioCompleto, consecutivoRef);
    const nombreCompleto = [dto.nombre, dto.apellidoPaterno, dto.apellidoMaterno].filter(Boolean).join(' ');
    const institucionFinal = dto.institucion === 'Otro' ? (dto.otraInstitucion || 'Otro') : dto.institucion;
    const carreraFinal = dto.carrera === 'Otro' ? (dto.otraCarrera || 'Otro') : dto.carrera;
    const medioFinal = dto.comoSeEntero === 'Otro' ? (dto.otroMedio || 'Otro') : dto.comoSeEntero;

    const telefonoLimpio = this.sanitizarTelefono(dto.telefono, 10, 'El teléfono');
    const contactoEmergenciaTelefonoLimpio = this.sanitizarTelefono(
      dto.contactoEmergenciaTelefono,
      15,
      'El teléfono del contacto de emergencia',
    );

    return this.prisma.participantes.create({
      data: {
        evento: eventoId,
        nombre: nombreCompleto,
        genero: genero.id,
        edad: dto.edad,
        correo_electronico: dto.email,
        telefono: telefonoLimpio,
        matricula: dto.numeroControl?.trim() || '0',
        institucion: institucionFinal,
        carrera: carreraFinal,
        tipo_participacion: CODIGO_TIPO[dto.tipoParticipacion],
        referencia_bancaria: referencia,
        estado: estadoPendiente.id,
        estado_procedencia: dto.estado,
        contacto_emergencia_nombre: dto.contactoEmergenciaNombre,
        contacto_emergencia_telefono: contactoEmergenciaTelefonoLimpio,
        medio_difusion: medioFinal,
        consentimiento: dto.consentimiento,
        monto: evento.costo ?? 0,
      },
    });
  }

  // =====================================================
  // PÚBLICO — consultas del participante
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
  // PÚBLICO — comprobante de pago
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

    return Promise.all(participantes.map((p) => this.mapParticipante(p)));
  }

  private async mapParticipante(p: any) {
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
      name: p.nombre,
      control: p.matricula,
      type: p.tipo_participante?.nombre ?? '',
      email: p.correo_electronico,
      payment,
      attended: false,
      reference: p.referencia_bancaria,
      receiptName,
      receiptUrl,
      receiptDate: p.fecha_comprobante
        ? new Date(p.fecha_comprobante).toLocaleDateString('es-MX')
        : null,
      certificate: false,
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
}