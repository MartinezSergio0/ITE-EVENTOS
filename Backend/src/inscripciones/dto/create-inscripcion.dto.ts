import { IsBoolean, IsEmail, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateInscripcionDto {
  @IsString() apellidoPaterno!: string;
  @IsString() apellidoMaterno!: string;
  @IsString() nombre!: string;
  @IsInt() @Min(1) @Max(120) edad!: number;
  @IsOptional() @IsString() numeroControl?: string;
  @IsIn(['Masculino', 'Femenino']) sexo!: string;
  @IsEmail() email!: string;
  @IsString() telefono!: string;
  @IsString() estado!: string;
  @IsString() institucion!: string;
  @IsOptional() @IsString() otraInstitucion?: string;
  @IsString() carrera!: string;
  @IsOptional() @IsString() otraCarrera?: string;
  @IsString() contactoEmergenciaNombre!: string;
  @IsString() contactoEmergenciaTelefono!: string;
  @IsIn(['Participante general', 'Estudiante', 'Docente']) tipoParticipacion!: string;
  @IsString() comoSeEntero!: string;
  @IsOptional() @IsString() otroMedio?: string;
  @IsBoolean() consentimiento!: boolean;
}