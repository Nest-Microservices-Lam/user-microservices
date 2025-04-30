import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(255, { message: 'El nombre no puede exceder los 100 caracteres' })
  @MinLength(3, { message: 'El nombre no puede menos de 3 caracteres' })
  fullName: string;

  @IsString()
  @MaxLength(11)
  @MinLength(6)
  @Matches(/^[0-9]+$/, { message: 'La cédula debe contener solo números' })
  idCard: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateBirth?: Date;

  @IsOptional()
  intentionVote?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  department?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  municipalitie?: string;

  @IsString()
  @Max(200)
  @IsOptional()
  zona?: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  position?: string;

  @IsString()
  @Max(1000)
  @IsOptional()
  table: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  address?: string;

  @IsString()
  @MaxLength(10)
  @MinLength(10)
  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'El teléfono debe contener solo números' })
  phone?: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede exceder los 20 caracteres',
  })
  @IsOptional()
  password: string;
}
