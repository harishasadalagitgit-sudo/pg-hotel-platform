import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { FilterRoomDto } from './dto/filter-room.dto';

@Controller('rooms')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
  ) {}

  @Post()
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERVISOR,
  )
  create(
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomsService.create(
      createRoomDto,
    );
  }


  @Get('available')
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  findAvailable() {
    return this.roomsService.findAvailable();
  }

  @Get('occupancy')
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  occupancyStats() {
    return this.roomsService.occupancyStats();
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  findAll(@Query() filter: FilterRoomDto) {
    return this.roomsService.search(filter);
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERVISOR,
  )
  findOne(
    @Param('id') id: string,
  ) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERVISOR,
  )
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(
      id,
      updateRoomDto,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(
    @Param('id') id: string,
  ) {
    return this.roomsService.remove(id);
  }
}
