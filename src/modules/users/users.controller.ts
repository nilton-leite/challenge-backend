import { Controller, Post, Body, HttpStatus, Query, Param, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { UsersService } from './users.service';
import { Return, ReturnSuccess, ReturnToken } from 'src/utils/returns';
import { SuccessTokenResponse, UnauthorizedResponse } from 'src/utils/dto/responses.dto';
import { CreateUsersDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
   constructor(private usersService: UsersService) {}

   @Post('create')
   async create(@Body() body: CreateUsersDto): Promise<ReturnSuccess> {
      return this.usersService.create(body)
   }

   @Get(':id')
   async findOneBy(@Param('id') id: string): Promise<ReturnSuccess> {
      return this.usersService.findOne(id)
   }
}
