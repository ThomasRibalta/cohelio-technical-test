import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    if (await this.userModel.findOne({ email: createUserDto.email })) {
      return 'User already exists';
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    createUserDto.password = hashedPassword;

    const user = new this.userModel(createUserDto);
    await user.save();

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      return 'User not found';
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      return 'Invalid password';
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async validateUser(payload: any): Promise<any> {
    return { userId: payload.sub, email: payload.email };
  }
}
