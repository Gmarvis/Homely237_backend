import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // Create Product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  // Get all Products
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //GET BY PRODUCT ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findByProductId(id);
  }

  //GET BY PRODUCT ID
  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.productService.findByUserId(id);
  }

  // UPDATE PRODUCT
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  // DELETE PRODUCT
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  // GET PRODUCT BY CATEGORY ID
  @Get('/category/:id')
  getProductByCathegory(@Param('id') id: string) {
    return this.productService.findByCathegory(id);
  }
}
