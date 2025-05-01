import { IsEnum, IsOptional } from 'class-validator';
import { IntencionVoto } from '../enums/intencion-voto.type';

//-------------------------------------------------------

export class UpdateUserIntentionDto {
  @IsEnum(IntencionVoto)
  @IsOptional()
  intentionVote: IntencionVoto;
}
