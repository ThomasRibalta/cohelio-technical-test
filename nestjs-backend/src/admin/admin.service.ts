import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from '../Review/schema/review.schema';
import { User } from '../Users/schema/user.schema';
import { on } from 'events';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getReviews({ page, sortby, order, req, only, onlyname }) {
    if (!req.user.role || req.user.role !== 'admin') {
      return new HttpException('Unauthorized', 401);
    }
    if (page < 1) {
      return new HttpException('Page number must be greater than 0', 400);
    }

    if (onlyname != null && !['rate', 'type'].includes(onlyname)) {
      onlyname = null;
    }

    const filter = {};

    if (only && onlyname) {
      filter[onlyname] = only;
    }

    const reviews = await this.reviewModel
      .find(only && onlyname ? filter : {})
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

  async getUsers({ page, sortby, order, req, only, onlyname }) {
    if (!req.user.role || req.user.role !== 'admin') {
      return new HttpException('Unauthorized', 401);
    }
    if (!page || page < 1) {
      page = 1;
    }

    if (onlyname != null && !['role'].includes(onlyname)) {
      onlyname = null;
    }

    const filter = {};

    if (only && onlyname) {
      filter[onlyname] = only;
    }

    let clients = await this.userModel
      .find(only && onlyname ? filter : {})
      .sort({ [sortby]: order })
      .skip((page - 1) * 10)
      .limit(10)
      .select('-password');

    let currentPage = page;
    let totalClients = await this.userModel.countDocuments();
    let totalPages = Math.ceil(totalClients / 10);

    return new HttpException(
      { clients: clients, currentPage: currentPage, totalPages: totalPages },
      HttpStatus.OK,
    );
  }

  async getStats({ req }) {
    if (!req.user.role || req.user.role !== 'admin') {
      return new HttpException('Unauthorized', 401);
    }

    const reviewsStats = await this.reviewModel
      .aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
            avgRate: { $avg: '$rate' },
          },
        },
        {
          $group: {
            _id: null,
            types: {
              $push: {
                type: '$_id',
                count: '$count',
                avgRate: '$avgRate',
              },
            },
            totalReviews: { $sum: '$count' },
            globalAvgRate: {
              $avg: '$avgRate',
            },
          },
        },
        {
          $project: {
            _id: 0,
            statisticsByType: '$types',
            totalReviews: 1,
            globalAvgRate: 1,
          },
        },
      ])
      .exec();

    const usersStats = await this.userModel.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          roles: {
            $push: {
              role: '$_id',
              count: '$count',
            },
          },
          totalUsers: { $sum: '$count' },
        },
      },
      {
        $project: {
          _id: 0,
          statisticsByRole: '$roles',
          totalUsers: 1,
        },
      },
    ]);

    return new HttpException(
      {
        reviewsStats: reviewsStats,
        usersStats: usersStats,
      },
      200,
    );
  }
}
