import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { Return, ReturnToken } from 'src/utils/returns';
import { SuccessTokenResponse, UnauthorizedResponse } from 'src/utils/dto/responses.dto';

@Controller()
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post('auth')
   @Public()
   async login(@Body() body: { username: string; password: string }): Promise<ReturnToken | Return> {
      return this.authService.validateUser(body.username, body.password);
   }
}
