import {
  IsOptional,
  IsString,
} from 'class-validator';

import { ResidentStatus } from '@prisma/client';

export class FilterResidentDto {
  @IsOptional()
  status?: ResidentStatus;

  @IsOptional()
  @IsString()
  roomId?: string;
}
