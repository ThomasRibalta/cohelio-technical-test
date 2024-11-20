import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string, @Req() req: any) {
    return await this.usersService.getUserById(id, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @Req() req: any,
  ) {
    return await this.usersService.updateUserById(id, updateUser, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Param('id') id: string, @Req() req: any) {
    console.log('req.user', req.user);
    return await this.usersService.deleteUserById(id, req.user);
  }
}
