import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';

@Controller('eventos/:eventoId/inscripciones')
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  @Post()
  crear(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Body() dto: CreateInscripcionDto,
  ) {
    return this.service.crear(dto, eventoId);
  }

  @Get('referencia/:referencia')
  buscarPorReferencia(@Param('referencia') referencia: string) {
    return this.service.buscarPorReferencia(referencia);
  }

  @Get('buscar')
  buscarPorDatos(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Query('correo') correo: string,
    @Query('control') control: string,
  ) {
    return this.service.buscarPorDatos(eventoId, correo, control);
  }
}