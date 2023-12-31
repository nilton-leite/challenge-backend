import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
config();

const configService = new ConfigService();

export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('SECRET_JWT'),
      });
   }

   async validate(payload: any) {
      return { userId: payload.sub, username: payload.username };
   }
}
