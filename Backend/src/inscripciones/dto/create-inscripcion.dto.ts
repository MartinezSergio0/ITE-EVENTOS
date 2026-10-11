import { IsBoolean, IsEmail, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateInscripcionDto {
  // ---------- Ambos eventos ----------
  @IsString() nombre!: string;
  @IsString() apellidoPaterno!: string;
  @IsOptional() @IsString() apellidoMaterno?: string;
  @IsInt() @Min(1) @Max(120) edad!: number;
  @IsOptional() @IsString() numeroControl?: string;
  @IsIn(['Masculino', 'Femenino']) sexo!: string;
  @IsEmail() email!: string;
  @IsString() telefono!: string;
  @IsString() institucion!: string;
  @IsOptional() @IsString() otraInstitucion?: string;
  @IsString() carrera!: string;
  @IsOptional() @IsString() otraCarrera?: string;
  @IsBoolean() consentimiento!: boolean;

  // ---------- Solo ESCALA ----------
  @IsOptional() @IsString() estado?: string;
  @IsOptional() @IsString() contactoEmergenciaNombre?: string;
  @IsOptional() @IsString() contactoEmergenciaTelefono?: string;
  @IsOptional() @IsIn(['Participante general', 'Estudiante', 'Docente']) tipoParticipacion?: string;
  @IsOptional() @IsString() comoSeEntero?: string;
  @IsOptional() @IsString() otroMedio?: string;

  // ---------- Solo Argos ----------
  @IsOptional() @IsString() @MaxLength(30) tallaPlayera?: string;
  @IsOptional() @IsString() @MaxLength(2) semestre?: string;
  @IsOptional() @IsString() taller?: string;
  @IsOptional() @IsString() visitaEmpresa?: string;
}