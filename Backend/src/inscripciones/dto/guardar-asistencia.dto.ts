import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, IsString, Matches } from 'class-validator';

export class GuardarAsistenciaDto {
  @IsIn(['evento', 'taller', 'actividad']) tipo!: 'evento' | 'taller' | 'actividad';

  @IsOptional() @Type(() => Number) @IsInt() actividadId?: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe ser AAAA-MM-DD' })
  fecha!: string;

  // Solo lo que cambió en este dispositivo
  @IsArray() @IsString({ each: true }) agregar!: string[];
  @IsArray() @IsString({ each: true }) quitar!: string[];
}