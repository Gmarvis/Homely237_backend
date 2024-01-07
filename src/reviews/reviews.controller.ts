import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReviewDto';
import { UpdateReviewDto } from './dto/updateReviewDto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // CREATE REVIEW
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview({
      ...createReviewDto,
    });
  }

  // UPDATE REVIEW
  @Put(':id')
  update(@Param('id') id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  // DELETE REVIEW
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }

  // FIND BY PRODUCT ID
  @Get('/product/:id')
  findByProductId(@Param('id') id: string) {
    return this.reviewsService.findByProductId(id);
  }
}
