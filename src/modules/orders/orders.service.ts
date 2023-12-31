import { HttpStatus, Injectable } from '@nestjs/common';
import { Return, ReturnSuccess } from 'src/utils/returns';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { get } from 'src/utils/response';
import { CreateOrdersDto } from './dto/create-orders.dto';
import * as bcrypt from 'bcrypt';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Injectable()
export class OrdersService {
   constructor(private prisma: PrismaService) {}
   async create(body: CreateOrdersDto): Promise<ReturnSuccess> {
      try {
         return get(HttpStatus.OK, "Order created successfully", await this.prisma.order.create({ data: body}));
      } catch (error) {
         return get(
            HttpStatus.BAD_REQUEST,
            "An error occurred while creating an order",
            error,
         );
      }
   }
   async findMany(): Promise<ReturnSuccess> {
      return get(HttpStatus.OK, "Orders successfully redeemed", await this.prisma.order.findMany());
   }
   async update(id: string, body: UpdateOrdersDto): Promise<ReturnSuccess> {
      try {
         return get(HttpStatus.OK, "Order updated successfully", await this.prisma.order.update({where: {id: parseInt(id)}, data: {status: body.status}}));
      } catch (error) {
         return get(
            HttpStatus.BAD_REQUEST,
            "An error occurred while updating an order",
            error,
         );
      }   
   }
   

  
}
