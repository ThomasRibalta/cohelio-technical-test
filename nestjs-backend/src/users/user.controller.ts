import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.usersService.updateUserById(id, updateUser);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
