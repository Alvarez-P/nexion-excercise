import { plainToInstance } from 'class-transformer';
import { ProductCategory } from './product-category.entity';

export class ProductCategoryBuilder {
  readonly #productCategory: ProductCategory;

  constructor(productCategory?: ProductCategory) {
    const now = new Date();
    this.#productCategory = productCategory
      ? plainToInstance(ProductCategory, { ...productCategory })
      : new ProductCategory('', '', null, now, now, null, '', '', null);
  }

  id(id: string): ProductCategoryBuilder {
    this.#productCategory.id = id;
    return this;
  }

  name(name: string): ProductCategoryBuilder {
    this.#productCategory.name = name;
    return this;
  }

  description(description: string | null): ProductCategoryBuilder {
    this.#productCategory.description = description;
    return this;
  }

  createdAt(createdAt: Date): ProductCategoryBuilder {
    this.#productCategory.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): ProductCategoryBuilder {
    this.#productCategory.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): ProductCategoryBuilder {
    this.#productCategory.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): ProductCategoryBuilder {
    this.#productCategory.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): ProductCategoryBuilder {
    this.#productCategory.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): ProductCategoryBuilder {
    this.#productCategory.updatedBy = updatedBy;
    return this;
  }

  build(): ProductCategory {
    return new ProductCategory(
      this.#productCategory.id,
      this.#productCategory.name,
      this.#productCategory.description,
      this.#productCategory.updatedAt,
      this.#productCategory.createdAt,
      this.#productCategory.deletedAt,
      this.#productCategory.updatedBy,
      this.#productCategory.createdBy,
      this.#productCategory.deletedBy,
    );
  }
}
