import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDocument } from './product.schema';

@Injectable() /* означает,что я могу внедрить эту функциональность в другой файл...не совсем понимаю пока...типа,могу это ещё где то использовать */
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument> /* тут уже с айдишником моделька */,
  ) { }

  async create(
    name: string,
    price: number,
    description: string,
  ): Promise<ProductDocument> {
    const newProduct /* тут уже с айдишником */ = new this.productModel({
      name,
      price,
      description,
    });
    return newProduct.save(); /* сохраняю в бд */
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async find(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string,
  ): Promise<ProductDocument> {
    let existingProduct = await this.find(id);
    existingProduct.name =
      newName ??
      existingProduct.name; /* если есть новое имя, его беру, если нет, то старое оставля. */
    existingProduct.price = newPrice ?? existingProduct.price;
    existingProduct.description = newDescription ?? existingProduct.description;

    return existingProduct.save();
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id/* в базе айдишник с нижним подчеркиванием */ }).exec();
  }
}
