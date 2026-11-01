import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class ActualizarParticipanteDto {
  @IsOptional() @IsString() @MaxLength(100) nombre?: string;
  @IsOptional() @IsString() @MaxLength(15) matricula?: string;
  @IsOptional() @IsEmail() @MaxLength(255) email?: string;
  @IsOptional() @IsString() @MaxLength(20) nss?: string;
  @IsOptional() @IsString() @MaxLength(150) taller?: string;
  @IsOptional() @IsString() @MaxLength(150) visitaEmpresa?: string;
}