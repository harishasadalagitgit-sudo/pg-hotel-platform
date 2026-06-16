import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateResidentDto } from './dto/create-resident.dto';
import { FilterResidentDto } from './dto/filter-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';

@Injectable()
export class ResidentsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateResidentDto) {
    return this.prisma.resident.create({
      data: {
        userId: dto.userId,
        joiningDate: new Date(dto.joiningDate),
        rentAmount: dto.rentAmount,
        securityDeposit:
          dto.securityDeposit,
        emergencyContactName:
          dto.emergencyContactName,
        emergencyContactPhone:
          dto.emergencyContactPhone,
      },
      include: {
        user: true,
        room: true,
      },
    });
  }

  async findAll(
    filter: FilterResidentDto,
  ) {
    return this.prisma.resident.findMany({
      where: {
        status: filter.status,
        roomId: filter.roomId,
      },
      include: {
        user: true,
        room: true,
      },
    });
  }

  async findOne(id: string) {
    const resident =
      await this.prisma.resident.findUnique({
        where: { id },
        include: {
          user: true,
          room: true,
        },
      });

    if (!resident) {
      throw new NotFoundException(
        'Resident not found',
      );
    }

    return resident;
  }

  async update(
    id: string,
    dto: UpdateResidentDto,
  ) {
    await this.findOne(id);

    return this.prisma.resident.update({
      where: { id },
      data: {
        ...dto,
        joiningDate: dto.joiningDate
          ? new Date(dto.joiningDate)
          : undefined,
      },
      include: {
        user: true,
        room: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.resident.delete({
      where: { id },
    });
  }
}
