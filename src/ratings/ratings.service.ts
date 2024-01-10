import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
// import { Product } from 'src/products/models/product.model';
import { CreateRatingDto } from './dto/createRatingDto';
// import { ProductsService } from 'src/products/products.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating)
    private ratingModel: typeof Rating,
    // private productService: ProductsService,
  ) {}

  // Rate product
  async rateProduct(createRatingDto: CreateRatingDto) {
    // const productsService = ProductsService
    const { product_id } = createRatingDto;

    const productRate = await this.ratingModel.create({ ...createRatingDto });

    if (productRate) {
      const allProducts = await this.ratingModel.findAll({
        where: { product_id },
      });
    }
  }
}

/* ====>TODO<==== 
COMPLETE THE PRODUCT RATING FUNTION
STEP 1==> GET ALL RATED PRODUCTS
STEP 2==> SOME ALL RATED PRODUCTS
STEP 3==> RETURN THE AVERAGE RATE
 ====>TODO<==== */
