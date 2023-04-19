import { plainToInstance } from 'class-transformer';
import { Stock } from './stock.entity';
import { Product } from 'src/products/domain/product.entity';
import { ProductBuilder } from 'src/products/domain/product.builder';
import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { BranchOfficeBuilder } from 'src/branch-offices/domain/branch-office.builder';
import { v4 } from 'uuid';

export class StockBuilder {
  readonly #stock: Stock;

  constructor(stock?: Stock) {
    const now = new Date();
    const product = new ProductBuilder().build();
    const branchOffice = new BranchOfficeBuilder().build();
    this.#stock = stock
      ? plainToInstance(Stock, { ...stock })
      : new Stock(
          v4(),
          '',
          '',
          branchOffice,
          '',
          product,
          0,
          now,
          now,
          null,
          '',
          '',
          null,
        );
  }

  id(id: string): StockBuilder {
    this.#stock.id = id;
    return this;
  }

  productId(productId: string): StockBuilder {
    this.#stock.productId = productId;
    return this;
  }

  product(product: Product): StockBuilder {
    this.#stock.product = product;
    return this;
  }

  branchOfficeId(branchOfficeId: string): StockBuilder {
    this.#stock.branchOfficeId = branchOfficeId;
    return this;
  }

  branchOffice(branchOffice: BranchOffice): StockBuilder {
    this.#stock.branchOffice = branchOffice;
    return this;
  }

  amount(amount: number): StockBuilder {
    this.#stock.amount = amount;
    return this;
  }

  createdAt(createdAt: Date): StockBuilder {
    this.#stock.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): StockBuilder {
    this.#stock.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): StockBuilder {
    this.#stock.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): StockBuilder {
    this.#stock.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): StockBuilder {
    this.#stock.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): StockBuilder {
    this.#stock.updatedBy = updatedBy;
    return this;
  }

  build(): Stock {
    return new Stock(
      this.#stock.id,
      this.#stock.name,
      this.#stock.branchOfficeId,
      this.#stock.branchOffice,
      this.#stock.productId,
      this.#stock.product,
      this.#stock.amount,
      this.#stock.updatedAt,
      this.#stock.createdAt,
      this.#stock.deletedAt,
      this.#stock.updatedBy,
      this.#stock.createdBy,
      this.#stock.deletedBy,
    );
  }
}
