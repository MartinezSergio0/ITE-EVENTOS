import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { SubirComprobanteDto } from './dto/subir-comprobante.dto';
import { GuardarAsistenciaDto } from './dto/guardar-asistencia.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('eventos/:eventoId/inscripciones')
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  // =====================================================
  // PUBLICO — registro y consulta participante
  // =====================================================

  @Post()
  crear(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Body() dto: CreateInscripcionDto,
  ) {
    return this.service.crear(dto, eventoId);
  }

  // Cupos de talleres y visitas (nombre, capacidad, ocupados, disponibles)
  @Get('cupos')
  obtenerCupos(@Param('eventoId', ParseIntPipe) eventoId: number) {
    return this.service.obtenerCupos(eventoId);
  }

  // QR del folio como imagen PNG: GET /eventos/5/inscripciones/qr/<folio>
  @Header('Cache-Control', 'private, max-age=86400')
  @Get('qr/:folio')
  async obtenerQr(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Param('folio') folio: string,
  ) {
    const png = await this.service.obtenerQrPng(eventoId, folio);
    return new StreamableFile(png, { type: 'image/png' });
  }

  @Get('buscar')
  buscarPorFolio(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Query('folio') folio: string,
  ) {
    return this.service.buscarPorFolio(eventoId, folio);
  }

  @Get('referencia/:referencia')
  buscarPorReferencia(@Param('referencia') referencia: string) {
    return this.service.buscarPorReferencia(referencia);
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

  @Get('folio')
  buscarPorCorreo(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Query('correo') correo: string,
  ) {
    return this.service.buscarPorCorreo(eventoId, correo);
  }

  // =====================================================
  // ADMIN — (AuthGuard)
  // =====================================================

  @UseGuards(AuthGuard)
  @Get('admin/participantes')
  listarParticipantes(@Param('eventoId', ParseIntPipe) eventoId: number) {
    return this.service.listarParticipantes(eventoId);
  }

  @UseGuards(AuthGuard)
  @Patch('admin/:folio/aprobar')
  aprobarPago(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Param('folio') folio: string,
  ) {
    return this.service.aprobarPago(eventoId, folio);
  }

  @UseGuards(AuthGuard)
  @Patch('admin/:folio/rechazar')
  rechazarPago(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Param('folio') folio: string,
  ) {
    return this.service.rechazarPago(eventoId, folio);
  }

  @UseGuards(AuthGuard)
  @Get('admin/asistencia/opciones')
  opcionesAsistencia(@Param('eventoId', ParseIntPipe) eventoId: number) {
    return this.service.opcionesAsistencia(eventoId);
  }

  @UseGuards(AuthGuard)
  @Get('admin/asistencia')
  obtenerAsistencia(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Query('tipo') tipo: string,
    @Query('fecha') fecha: string,
    @Query('actividadId') actividadId?: string,
  ) {
    return this.service.obtenerAsistencia(
      eventoId, tipo, actividadId ? Number(actividadId) : undefined, fecha,
    );
  }

  @UseGuards(AuthGuard)
  @Put('admin/asistencia')
  guardarAsistencia(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Body() dto: GuardarAsistenciaDto,
  ) {
    return this.service.guardarAsistencia(eventoId, dto);
  }
}