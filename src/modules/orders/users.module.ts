import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';


config();

const configService = new ConfigService();

@Module({
   imports: [],
   controllers: [OrdersController],
   providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
