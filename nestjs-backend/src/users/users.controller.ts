import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.usersService.getUsers({ page, limit });
  }
}
