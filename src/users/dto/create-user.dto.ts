import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../enums/role.type';

export class CreateUserDto {
  @IsString()
  @MaxLength(255, { message: 'El nombre no puede exceder los 100 caracteres' })
  @MinLength(3, { message: 'El nombre no puede menos de 3 caracteres' })
  fullName: string;

  @IsString()
  @IsOptional()
  createdById?: string;

  @IsString()
  @MaxLength(11)
  @MinLength(6)
  idCard: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateBirth?: Date;

  @IsString()
  @IsOptional()
  role?: Role;

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
