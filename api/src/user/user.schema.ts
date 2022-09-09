import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User &
  Document; /* добавляю в схему типы из монгуса(айдишник и тд) */

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, unique: true /* email делаю уникальным */ })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
