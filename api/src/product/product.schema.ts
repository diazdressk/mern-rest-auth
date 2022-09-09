import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document /* эта штука даст айдишник */;

@Schema()
export class Product {
  /* айдишник автоматически генерируется,поэтому его тут не добавляю */
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);/* связываю вот так и экспортирую схему...мои свойства name,price,description и их монгуса айдишник и ещё какие то */
