import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getNotices(
    @Query('page') page = 1,
    @Query('sortby') sortby = 'createdAt',
    @Query('order') order = 'desc',
  ) {
    return await this.reviewService.getReviews({ page, sortby, order });
  }
}
