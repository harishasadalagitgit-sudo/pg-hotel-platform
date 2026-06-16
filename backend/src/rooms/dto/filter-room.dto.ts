import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomStatus, RoomType } from '@prisma/client';

export class FilterRoomDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  floor?: number;

  @IsOptional()
  @IsEnum(RoomType)
  roomType?: RoomType;

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;
}
