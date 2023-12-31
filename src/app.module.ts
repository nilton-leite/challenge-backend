import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { OrdersModule } from './modules/orders/users.module';

@Module({
   imports: [
      PrismaModule,
      UsersModule,
      OrdersModule,
      AuthModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
