import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IntencionVoto } from '../enums/intencion-voto.type';

//-------------------------------------------------------

export class UpdateUserIntentionDto {
  @IsString()
  id: string;

  @IsEnum(IntencionVoto)
  @IsOptional()
  intentionVote: IntencionVoto;
}
