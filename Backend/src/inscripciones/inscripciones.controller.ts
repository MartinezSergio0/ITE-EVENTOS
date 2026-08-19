import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { SubirComprobanteDto } from './dto/subir-comprobante.dto';

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

  @Post('comprobante')
  @UseInterceptors(FileInterceptor('archivo'))
  subirComprobante(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Body() dto: SubirComprobanteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Debes adjuntar el comprobante.');
    }

    const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!tiposPermitidos.includes(file.mimetype)) {
      throw new BadRequestException('El comprobante debe ser JPG, PNG o PDF.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('El comprobante no puede superar los 5 MB.');
    }

    return this.service.subirComprobante(eventoId, dto, file);
  }
}