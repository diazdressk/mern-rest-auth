/* тут собирается всё */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({/* данные с енв чтобы мог везде забирать */
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/amazon') /* подключаю бд */,
    ProductModule,
    UserModule,
    AuthModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
