import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schema/review.schema';
import { on } from 'events';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(createReviewDto: any, user: any) {
    createReviewDto.client = user.userId;
    const review = new this.reviewModel(createReviewDto);
    await review.save();

    return new HttpException({ success: 'Review successfully created !' }, 201);
  }

  async getReviews({ page, sortby, order }) {
    if (page < 1) {
      return new HttpException('Page number must be greater than 0', 400);
    }

    const reviews = await this.reviewModel
      .find()
      .populate({
        path: 'client',
        select: 'email username',
      })
      .sort({ [sortby]: order })
      .limit(10)
      .skip(10 * (page - 1))
      .lean()
      .exec();

    const reviewsCount = await this.reviewModel.countDocuments();
    const pages = Math.ceil(reviewsCount / 10);

    return new HttpException(
      { reviews: reviews, currentPage: page, totalPages: pages },
      200,
    );
  }

  async deleteReviewById(id: string, user: any) {
    if (!id) {
      return new HttpException('Review ID is required', 400);
    }
    if (!user.role || user.role !== 'admin') {
      return new HttpException('Unauthorized', 401);
    }
    await this.reviewModel.findByIdAndDelete(id);

    return new HttpException({ success: 'Review successfully deleted !' }, 200);
  }
}
