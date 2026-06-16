import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FilterRoomDto } from './dto/filter-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: {
        roomNumber: createRoomDto.roomNumber,
        floor: createRoomDto.floor,
        roomType: createRoomDto.roomType,
        capacity: createRoomDto.capacity,
        isAc: createRoomDto.isAc,
        status:
          createRoomDto.status ??
          'AVAILABLE',
      },
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: {
        floor: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const room =
      await this.prisma.room.findUnique({
        where: { id },
      });

    if (!room) {
      throw new NotFoundException(
        'Room not found',
      );
    }

    return room;
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ) {
    await this.findOne(id);

    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.room.delete({
      where: { id },
    });
  }

  async search(filter: FilterRoomDto) {
    return this.prisma.room.findMany({
      where: {
        floor: filter.floor,
        roomType: filter.roomType,
        status: filter.status,
      },
      orderBy: [
        { floor: 'asc' },
        { roomNumber: 'asc' },
      ],
    });
  }

  async findAvailable() {
    return this.prisma.room.findMany({
      where: {
        status: 'AVAILABLE',
      },
      orderBy: [
        { floor: 'asc' },
        { roomNumber: 'asc' },
      ],
    });
  }

  async occupancyStats() {
    const totalRooms =
      await this.prisma.room.count();

    const availableRooms =
      await this.prisma.room.count({
        where: {
          status: 'AVAILABLE',
        },
      });

    const occupiedRooms =
      await this.prisma.room.count({
        where: {
          status: 'OCCUPIED',
        },
      });

    const maintenanceRooms =
      await this.prisma.room.count({
        where: {
          status: 'MAINTENANCE',
        },
      });

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      maintenanceRooms,
      occupancyPercentage:
        totalRooms === 0
          ? 0
          : Math.round(
              (occupiedRooms / totalRooms) * 100,
            ),
      };
    }
}
