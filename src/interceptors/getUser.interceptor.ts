import { Observable } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
@Injectable()
export class GetUserInterceptor implements NestInterceptor {
   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
     
      return next.handle();
   }

   async getUserIdFromToken(token: string): Promise<string> {
      try {
         const buff = Buffer.from(token.split('.')[1], 'base64');
         return JSON.parse(buff.toString()).userId;
      } catch (_) {
         return null;
      }
   }
}
