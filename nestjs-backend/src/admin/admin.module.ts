import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { ReviewModule } from 'src/Review/review.module';

@Module({
  imports: [UsersModule, ReviewModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
