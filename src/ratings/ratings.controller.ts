import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  // GET ALL RATED PROCUCT
  @Get('/rated/:product_id')
  getAllRatedProducts(@Param('product_id') product_id: string) {
    return this.ratingService.getRatedProduct(product_id);
  }

  // GET ALL
  @Get()
  getAll() {
    return this.ratingService.findAll();
  }
}
