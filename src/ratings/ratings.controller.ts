import { Body, Controller, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/createRatingDto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {}

  // RATE PRODUCT
  @Post()
  rateProduct(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.rateProduct(createRatingDto);
  }
}
