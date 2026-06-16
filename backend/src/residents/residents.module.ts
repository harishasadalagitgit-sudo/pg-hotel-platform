import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { ResidentsController } from './residents.controller';
import { ResidentsService } from './residents.service';

@Module({
  imports: [PrismaModule],
  controllers: [ResidentsController],
  providers: [ResidentsService],
})
export class ResidentsModule {}
