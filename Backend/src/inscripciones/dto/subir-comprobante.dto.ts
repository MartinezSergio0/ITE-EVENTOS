import { IsEmail, IsString } from 'class-validator';

export class SubirComprobanteDto {
  @IsString() referencia!: string;
  @IsEmail() correo!: string;
}