import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { ReviewModule } from 'src/Review/review.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ReviewModule,
  ],
  exports: [MongooseModule],
  providers: [UsersService],
  controllers: [UsersController, UserController],
})
export class UsersModule {}
