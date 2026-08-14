import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';

const CODIGO_TIPO: Record<string, number> = {
  'Participante general': 1,
  'Estudiante': 2,
  'Docente': 3,
};

@Injectable()
export class InscripcionesService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.participantes.create({
      data: {
        evento: eventoId,
        nombre: nombreCompleto,
        genero: genero.id,
        edad: dto.edad,
        correo_electronico: dto.email,
        telefono: dto.telefono,
        matricula: dto.numeroControl?.trim() || '0',
        institucion: institucionFinal,
        carrera: carreraFinal,
        tipo_participacion: CODIGO_TIPO[dto.tipoParticipacion],
        referencia_bancaria: referencia,
        estado: estadoPendiente.id,
        estado_procedencia: dto.estado,
        contacto_emergencia_nombre: dto.contactoEmergenciaNombre,
        contacto_emergencia_telefono: dto.contactoEmergenciaTelefono,
        medio_difusion: medioFinal,
        consentimiento: dto.consentimiento,
        monto: evento.costo ?? 0,
      },
    });
  }

  async buscarPorDatos(eventoId: number, correo: string, control: string) {
    const participante = await this.prisma.participantes.findFirst({
      where: { evento: eventoId, correo_electronico: correo, matricula: control },
    });
    if (!participante) throw new NotFoundException('No se encontró un registro con esos datos.');
    return participante;
  }

  async buscarPorReferencia(referencia: string) {
    return this.prisma.participantes.findUnique({ where: { referencia_bancaria: referencia } });
  }
}