import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.auth';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

config();

const configService = new ConfigService();

@Module({
   imports: [
      PassportModule,
      JwtModule.register({
         secret: configService.get('SECRET_JWT'),
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, UsersService, PrismaService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
