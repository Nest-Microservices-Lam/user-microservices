import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserpasswordDto {
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede exceder los 20 caracteres',
  })
  @IsOptional()
  password: string;
}
