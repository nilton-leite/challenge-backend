import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';


config();

const configService = new ConfigService();

@Module({
   imports: [],
   controllers: [UsersController],
   providers: [UsersService, PrismaService],
})
export class UsersModule {}
