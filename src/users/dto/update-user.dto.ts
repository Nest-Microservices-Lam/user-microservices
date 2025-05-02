import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'El nombre no puede exceder los 100 caracteres' })
  @MinLength(3, { message: 'El nombre no puede menos de 3 caracteres' })
  fullName: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  @MinLength(6)
  @Matches(/^[0-9]+$/, { message: 'La cédula debe contener solo números' })
  idCard: string;

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
  @MaxLength(100)
  @IsOptional()
  department?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  municipalitie?: string;

  @Max(200)
  @IsOptional()
  zona?: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  votingPlace?: string;

  @Max(1000)
  @IsOptional()
  table: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  address?: string;
}
