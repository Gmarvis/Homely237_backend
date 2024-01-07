import { Injectable } from '@nestjs/common';
import { Review } from './models/review.model';
import { CreateReviewDto } from './dto/createReviewDto';
import { UpdateReviewDto } from './dto/updateReviewDto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
  ) {}

  // CREATE REVIEW
  async createReview(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create({ ...createReviewDto });
  }

  // FETCH ALL REVIEWS
  async findAllReview(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  // FETCH ONE
  fineOne(id: string) {
    return this.reviewModel.findOne({
      where: {
        id,
      },
    });
  }

  // FETCH ONE
  findByProductId(product_id: string) {
    return this.reviewModel.findOne({
      where: {
        product_id,
      },
    });
  }

  // UPDATE CATEGORY
  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    const updatedReview = await this.reviewModel.update(updateReviewDto, {
      where: { id },
    });

    if (updatedReview) {
      return await this.reviewModel.findOne({
        where: {
          id,
        },
      });
    }
  }

  // DELETE REVIEW
  async remove(id: string) {
    return await this.reviewModel.destroy({
      where: {
        id,
      },
    });
  }
}
