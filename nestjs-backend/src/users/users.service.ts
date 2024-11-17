import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async getUsers({ page, limit }) {
    return await this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async updateUserById(id: string, updateUserDto: any) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUserById(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
