import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingEmail) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const existingPhone = await this.prisma.user.findUnique({
      where: {
        phone: createUserDto.phone,
      },
    });

    if (existingPhone) {
      throw new BadRequestException(
        'Phone already registered',
      );
    }

    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        phone: createUserDto.phone,
        passwordHash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: createUserDto.role ?? UserRole.RESIDENT,
      },
    });

    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
  }
}
