import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(/^[0-9]{10}$/, {
    message: 'Phone number must be exactly 10 digits',
  })
  phone: string;

  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
