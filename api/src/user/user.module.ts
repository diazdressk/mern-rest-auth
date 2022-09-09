import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]/* Модель будет ссылаться на UserSchema */,
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]/* экспортирую сервисы,буду пользоваться ими в auth */
})

export class UserModule { }
