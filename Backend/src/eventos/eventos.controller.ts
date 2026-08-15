import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly service: EventosService) {}

  @Get()
  listar(@Query('categoria') categoria: string) {
    return this.service.listarPorCategoria(categoria);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtenerPorId(id);
  }
  
  @Get('categorias/listado')
  listarCategorias() {
    return this.service.listarCategorias();
  }
}