import { Controller, Post, Body, HttpStatus, Query, Param, Get, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Return, ReturnSuccess, ReturnToken } from 'src/utils/returns';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

@Controller('orders')
export class OrdersController {
   constructor(private OrdersService: OrdersService) {}

   @Post('create')
   async create(@Body() body: CreateOrdersDto): Promise<ReturnSuccess> {
      return this.OrdersService.create(body)
   }

   @Get()
   async findMany(): Promise<ReturnSuccess> {
      return this.OrdersService.findMany()
   }

   @Put('update/status/:id')
   async update(@Param('id') id: string, @Body() body: UpdateOrdersDto): Promise<ReturnSuccess> {
      return this.OrdersService.update(id, body)
   }
}
