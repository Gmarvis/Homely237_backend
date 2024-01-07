import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { User } from 'src/users/models/user.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  // CREATE PRODUCT //
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create({ ...createProductDto });
  }

  // FETCH ALL PRUDUCTS
  async findAll(): Promise<Product[]> {
    return this.productModel.findAll({
      include: {
        model: User,
      },
    });
  }

  // FIND PRUDUCT BY ID
  async findByProductId(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        // Category,
      },
    });
  }

  // FIND AND DELETE USER
  async remove(id: string): Promise<any> {
    return await this.productModel.destroy({
      where: {
        id,
      },
    });
    // return await product.destroy();
  }

  // FIND AND UPDATE
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.update(updateProductDto, {
      where: { id },
    });
    if (updatedProduct) {
      return await this.productModel.findOne({
        where: {
          id,
          include: {
            model: User,
          },
        },
      });
    }
  }

  // FIND BY USER_ID
  async findByUserId(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        user_id: id,
      },
      include: {
        model: User,
      },
    });
  }

  // FIND BY Cathegory
  async findByCathegory(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        category_id: id,
      },
      include: {
        model: User,
      },
    });
  }
}
