import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.register(createUserDto, res);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    return this.authService.logout(res);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserByToken(@Req() req: any) {
    return await this.authService.getUserByToken(req);
  }
}
