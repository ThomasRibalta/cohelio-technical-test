import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewsController } from './reviews.controller';
import { ReviewSchema } from './schema/review.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],
  providers: [ReviewService],
  controllers: [ReviewController, ReviewsController],
})
export class ReviewModule {}
