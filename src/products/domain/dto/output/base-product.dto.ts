import { Type } from 'class-transformer';
import { BaseProductCategoryDto } from 'src/product-categories/domain/dto/output/base-product-category.dto';

export class BaseProductDto {
  id: string;
  name: string;
  cost: number;
  price: number;
  categoryId: string;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;

  @Type(() => BaseProductCategoryDto)
  category: BaseProductCategoryDto;
}
