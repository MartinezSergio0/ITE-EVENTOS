import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) {}

  async listarCategorias() {
    return this.prisma.tipo_evento.findMany({
        where: { slug: { not: null } },
        orderBy: { id: 'asc' },
    });
  }
  private async slugPorTipoId(tipoId: number): Promise<string> {
    const tipo = await this.prisma.tipo_evento.findUnique({ where: { id: tipoId } });
    return tipo?.slug ?? '';
  }
    
  private async tipoIdPorSlug(slug: string): Promise<number | null> {
    const tipo = await this.prisma.tipo_evento.findFirst({ where: { slug } });
    return tipo?.id ?? null;
  }

    async listarPorCategoria(slug: string) {
    const tipoId = await this.tipoIdPorSlug(slug);
    if (!tipoId) return [];

    const eventos = await this.prisma.evento.findMany({
        where: { tipo: tipoId },
        orderBy: { inicio: 'asc' },
    });

    return Promise.all(eventos.map((e) => this.mapListado(e)));
    }

    async obtenerPorId(id: number) {
    const evento = await this.prisma.evento.findUnique({
        where: { id },
        include: {
        actividad_actividad_eventoToevento: { orderBy: { inicio: 'asc' } },
        },
    });

    if (!evento) throw new NotFoundException('Evento no encontrado');

    return this.mapDetalle(evento);
    }

    private async mapListado(e: any) {
    return {
        id: e.id,
        category: await this.slugPorTipoId(e.tipo),
        title: e.nombre,
        description: e.descripcion,
        image: e.banner ?? e.logo,
        date: this.formatearFecha(e.inicio, e.final),
        place: e.lugar,
        capacity: e.capacidad,
        website: e.sitio_web,
    };
    }

    private async mapDetalle(e: any) {
    const costo = e.costo ? Number(e.costo) : 0;

    return {
        id: e.id,
        category: await this.slugPorTipoId(e.tipo),
        title: e.nombre,
        shortDescription: e.descripcion,
        description: e.descripcion,
        banner: e.banner,
        logo: e.logo,
        date: this.formatearFecha(e.inicio, e.final),
        time: this.formatearHora(e.inicio),
        place: e.lugar,
        capacity: e.capacidad ? `${e.capacidad} participantes` : '',
        cost: costo > 0 ? `$${costo} MXN` : 'Gratuito',
        costoNumero: costo,  
        tienePago: costo > 0,
        registerRoute: this.registerRouteFor(e.id),
        website: e.sitio_web,
        activities: e.actividad_actividad_eventoToevento?.map((a: any) => a.nombre) ?? [],
        schedule: e.actividad_actividad_eventoToevento?.map((a: any) => ({
        time: this.formatearHora(a.inicio),
        activity: a.nombre,
        })) ?? [],
    };
    }

  private registerRouteFor(id: number): string {
    // Por ahora solo ESCALA tiene formulario de registro propio
    if (id === 4) return '/registro-escala';
    return '';
  }

  private formatearFecha(inicio: Date, final: Date): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const i = new Date(inicio);
    const f = new Date(final);

    if (i.toDateString() === f.toDateString()) {
      return `${i.getDate()} de ${meses[i.getMonth()]}`;
    }
    if (i.getMonth() === f.getMonth()) {
      return `${i.getDate()} al ${f.getDate()} de ${meses[i.getMonth()]}`;
    }
    return `${i.getDate()} de ${meses[i.getMonth()]} al ${f.getDate()} de ${meses[f.getMonth()]}`;
  }
  private formatearHora(fecha: Date): string {
    return new Date(fecha).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
    });
  }
}