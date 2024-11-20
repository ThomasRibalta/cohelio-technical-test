import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getReviewById() {
    return 'This action return one Review';
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateReviewById() {
    return 'This action updates a Review';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReviewById(@Param('id') id: string, @Req() req: any) {
    return this.reviewService.deleteReviewById(id, req.user);
  }
}
