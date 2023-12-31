import { HttpStatus, Injectable } from '@nestjs/common';
import { Return, ReturnSuccess } from 'src/utils/returns';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { get } from 'src/utils/response';
import { CreateUsersDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   constructor(private prisma: PrismaService) {}
   async create(body: CreateUsersDto): Promise<ReturnSuccess> {
      body.password = await bcrypt.hash(body.password, 10);
      return get(HttpStatus.OK, "Sucesso", await this.prisma.user.create({ data: {email: body.email, name:body.name, password: body.password}}));
   }
   async findOne(id: string): Promise<ReturnSuccess> {
      return get(HttpStatus.OK, "Sucesso", await this.prisma.user.findUnique({where: {id: parseInt(id)}}));
   }
   async findOneByEmail(email: string): Promise<User> {
      return await this.prisma.user.findUnique({where: {email}})
   }

  
}
