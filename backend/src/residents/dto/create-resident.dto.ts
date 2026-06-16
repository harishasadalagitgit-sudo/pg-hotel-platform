import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateResidentDto {
  @IsString()
  userId: string;

  @IsDateString()
  joiningDate: string;

  @IsNumber()
  rentAmount: number;

  @IsOptional()
  @IsNumber()
  securityDeposit?: number;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;
}
