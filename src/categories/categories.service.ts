import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  // CREATE CATEGORY
  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  // FETCH ALL CATEGORIES
  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  // FIND CATEGORY BY ID
  findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({
      where: {
        id,
      },
    });
  }

  // DELETE CATEGORY
  async remove(id: string): Promise<any> {
    return await this.categoryModel.destroy({
      where: {
        id,
      },
    });
  }

  // UPDATE CATEGORY
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
    });

    if (updatedCategory) {
      return await this.categoryModel.findOne({
        where: { id },
      });
    }
  }
}
