/* создал командой nest g s user --no-spec.чтобы автоматически импортировались, собрались в module */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';

import { UserDocument } from './user.schema';

@Injectable() /* означает, что можно переиспользовать */
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) { }

  /* служебный метод,который используется только тут */
  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  /* поиск пользователя по емейл и айди   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  /* создание пользователя, пароль заменяю на хэшированный */
  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
