import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
// import { Product } from 'src/products/models/product.model';
import { CreateRatingDto } from './dto/createRatingDto';
// import { UpdateProductDto } from 'src/products/dto/updateProductDto';
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

      let averageRate = 0;
      for (let i = 0; i < allProducts.length; i++) {
        averageRate += +allProducts[i]?.rate / allProducts.length;
        return averageRate;
      }
    }
  }

  // get all rated product by product id
  getRatedProduct(product_id: string) {
    return this.ratingModel.findAll({
      where: { product_id },
    });
  }

  // Get all rating
  findAll() {
    return this.ratingModel.findAll();
  }
}
