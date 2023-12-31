import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Return, ReturnToken } from 'src/utils/returns';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}
   async validateUser(username: string, password: string): Promise<ReturnToken | Return> {
      const user = await this.usersService.findOneByEmail(username);
      if (!user) {
         throw new UnauthorizedException('Usuário ou senha inválidos');
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
         return await this.generateToken(user);
      }
      throw new UnauthorizedException('Usuário ou senha inválidos');
   }

   async generateToken(user: User): Promise<ReturnToken> {
      const payload = { document: user.email, userId: user.id };
      return {
         access_token: this.jwtService.sign(payload),
         user,
      };
   }
}
