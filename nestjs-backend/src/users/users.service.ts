import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserById(id: string, user: any) {
    if (!id) {
      return new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    if (!user.role || user.role !== 'admin') {
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const client = await this.userModel.findById(id).select('-password');
    return new HttpException(client, HttpStatus.OK);
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

  async updateUserById(id: string, updateUserDto: any, user: any) {
    if (!id) {
      return new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    if (user.role !== 'admin' && user.userId !== id) {
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (updateUserDto.updatePassword) {
      if (!updateUserDto.password) {
        return new HttpException(
          'Password is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password;
    }

    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUserById(id: string, user: any) {
    if (!id) {
      return new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    if (!user.role || user.role !== 'admin') {
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.userModel.findByIdAndDelete(id);
  }
}
