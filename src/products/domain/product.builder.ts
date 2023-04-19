import { plainToInstance } from 'class-transformer';
import { Product } from './product.entity';
import { ProductCategory } from 'src/product-categories/domain/product-category.entity';
import { ProductCategoryBuilder } from 'src/product-categories/domain/product-category.builder';
import { v4 } from 'uuid';

export class ProductBuilder {
  readonly #product: Product;

  constructor(product?: Product) {
    const now = new Date();
    const category = new ProductCategoryBuilder().build();
    this.#product = product
      ? plainToInstance(Product, { ...product })
      : new Product(v4(), '', '', category, 0, 0, now, now, null, '', '', null);
  }

  id(id: string): ProductBuilder {
    this.#product.id = id;
    return this;
  }

  name(name: string): ProductBuilder {
    this.#product.name = name;
    return this;
  }

  categoryId(categoryId: string): ProductBuilder {
    this.#product.categoryId = categoryId;
    return this;
  }

  category(category: ProductCategory): ProductBuilder {
    this.#product.category = category;
    return this;
  }

  cost(cost: number): ProductBuilder {
    this.#product.cost = cost;
    return this;
  }

  price(price: number): ProductBuilder {
    this.#product.price = price;
    return this;
  }

  createdAt(createdAt: Date): ProductBuilder {
    this.#product.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): ProductBuilder {
    this.#product.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): ProductBuilder {
    this.#product.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): ProductBuilder {
    this.#product.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): ProductBuilder {
    this.#product.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): ProductBuilder {
    this.#product.updatedBy = updatedBy;
    return this;
  }

  build(): Product {
    return new Product(
      this.#product.id,
      this.#product.name,
      this.#product.categoryId,
      this.#product.category,
      this.#product.cost,
      this.#product.price,
      this.#product.updatedAt,
      this.#product.createdAt,
      this.#product.deletedAt,
      this.#product.updatedBy,
      this.#product.createdBy,
      this.#product.deletedBy,
    );
  }
}
