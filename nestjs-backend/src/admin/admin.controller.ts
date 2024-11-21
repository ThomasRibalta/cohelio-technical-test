import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @Query('page') page = 1,
    @Query('sortby') sortby = 'id',
    @Query('order') order = 'asc',
    @Query('only') only = null,
    @Query('onlyname') onlyname = null,
    @Req() req: any,
  ) {
    return await this.adminService.getUsers({
      page,
      sortby,
      order,
      req,
      only,
      onlyname,
    });
  }

  @Get('/reviews')
  @UseGuards(JwtAuthGuard)
  async getReviews(
    @Query('page') page = 1,
    @Query('sortby') sortby = 'createdAt',
    @Query('order') order = 'desc',
    @Query('only') only = null,
    @Query('onlyname') onlyname = null,
    @Req() req: any,
  ) {
    return await this.adminService.getReviews({
      page,
      sortby,
      order,
      req,
      only,
      onlyname,
    });
  }

  @Get('/stats')
  @UseGuards(JwtAuthGuard)
  async getStats(@Req() req: any) {
    return await this.adminService.getStats({ req });
  }
}
