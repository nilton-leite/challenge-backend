import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/jwt-auth.guard';
import { GetUserInterceptor } from './interceptors/getUser.interceptor';
import { HttpExceptionFilter } from './filters/httpExceptionFilters.filter';

config();
const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalInterceptors(new GetUserInterceptor());
  app.useGlobalPipes(
     new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, disableErrorMessages: false }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(3003);
   console.log('Service listening in PORT ', 3003);
}
bootstrap();
