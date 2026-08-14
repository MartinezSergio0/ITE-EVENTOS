import { IsEmail, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateInscripcionDto {
  @IsString() primerApellido!: string;
  @IsOptional() @IsString() segundoApellido?: string;
  @IsString() nombres!: string;
  @IsInt() @Min(1) @Max(100) edad!: number;
  @IsIn(['Femenino', 'Masculino']) sexo!: string;
  @IsOptional() @IsString() control?: string;
  @IsEmail() correo!: string;
  @IsString() whatsapp!: string;
  @IsString() institucion!: string;
  @IsIn(['Participante general', 'Estudiante', 'Docente']) tipoParticipacion!: string;
}