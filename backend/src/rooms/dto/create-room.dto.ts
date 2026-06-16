import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Min,
} from 'class-validator';

import {
  RoomStatus,
  RoomType,
} from '@prisma/client';

export class CreateRoomDto {
  @IsString()
  roomNumber: string;

  @IsInt()
  @Min(1)
  floor: number;

  @IsEnum(RoomType)
  roomType: RoomType;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsBoolean()
  isAc: boolean;

  @IsEnum(RoomStatus)
  status?: RoomStatus;
}
