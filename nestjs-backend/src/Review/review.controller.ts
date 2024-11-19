import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(@Body() createReviewDto: ReviewDto, @Req() req: any) {
    return this.reviewService.createReview(createReviewDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getReviewById() {
    return 'This action return one Review';
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateReviewById() {
    return 'This action updates a Review';
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteReviewById() {
    return 'This action removes a Review';
  }
}
