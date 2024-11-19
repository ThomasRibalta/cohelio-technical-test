import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async getUsers({ page, sortby, order }) {
    if (!page || page < 1) {
      page = 1;
    }
    let clients = await this.userModel
      .find()
      .sort({ [sortby]: order })
      .skip((page - 1) * 10)
      .limit(10)
      .select('-password');

    let currentPage = page;
    let totalClients = await this.userModel.countDocuments();
    let totalPages = Math.ceil(totalClients / 10);

    return new HttpException(
      { clients: clients, currentPage: currentPage, totalPages: totalPages },
      HttpStatus.OK,
    );
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
