import { Injectable, NotFoundException } from '@nestjs/common';
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

  async buscarPorDatos(eventoId: number, correo: string, control: string) {
    const participante = await this.prisma.participantes.findFirst({
      where: {
        evento: eventoId,
        correo_electronico: correo,
        matricula: control,
      },
    });

    if (!participante) {
      throw new NotFoundException('No se encontró un registro con esos datos.');
    }

    return participante;
  }

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
    const anioCompleto = new Date().getFullYear();

    const [consecutivoRef, genero, estadoPendiente] = await Promise.all([
      this.siguienteConsecutivoAnual(anioCompleto),
      this.prisma.genero.findFirst({ where: { nombre: dto.sexo } }),
      this.prisma.estado.findFirst({ where: { nombre: 'Pendiente' } }),
    ]);

    if (!genero) throw new NotFoundException(`No existe el género "${dto.sexo}" en el catálogo`);
    if (!estadoPendiente) throw new NotFoundException('No existe el estado "Pendiente" en el catálogo');

    const referencia = this.construirReferencia(dto.tipoParticipacion, anioCompleto, consecutivoRef);
    const nombreCompleto = [dto.nombres, dto.primerApellido, dto.segundoApellido].filter(Boolean).join(' ');

    return this.prisma.participantes.create({
      data: {
        evento: eventoId,
        nombre: nombreCompleto,
        genero: genero.id,
        edad: dto.edad,
        correo_electronico: dto.correo,
        telefono: dto.whatsapp,
        matricula: dto.control?.trim() || '0',
        institucion: dto.institucion,
        tipo_participacion: CODIGO_TIPO[dto.tipoParticipacion],
        referencia_bancaria: referencia,
        estado: estadoPendiente.id,
      },
    });
  }

  async buscarPorReferencia(referencia: string) {
    return this.prisma.participantes.findUnique({ where: { referencia_bancaria: referencia } });
  }
}