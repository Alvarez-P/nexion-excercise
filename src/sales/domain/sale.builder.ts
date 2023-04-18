import { plainToInstance } from 'class-transformer';
import { Sale } from './sale.entity';
import { Product } from 'src/products/domain/product.entity';
import { SaleOrderBuilder } from 'src/sale-orders/domain/sale-orders.builder';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { ProductBuilder } from 'src/products/domain/product.builder';

export class SaleBuilder {
  readonly #sale: Sale;

  constructor(sale?: Sale) {
    const now = new Date();
    const product = new ProductBuilder().build();
    const order = new SaleOrderBuilder().build();
    this.#sale = sale
      ? plainToInstance(Sale, { ...sale })
      : new Sale('', product, order, 0, 0, now, now, null, '', '', null);
  }

  id(id: string): SaleBuilder {
    this.#sale.id = id;
    return this;
  }

  product(product: Product): SaleBuilder {
    this.#sale.product = product;
    return this;
  }

  order(order: SaleOrder): SaleBuilder {
    this.#sale.order = order;
    return this;
  }

  amount(amount: number): SaleBuilder {
    this.#sale.amount = amount;
    return this;
  }

  total(total: number): SaleBuilder {
    this.#sale.total = total;
    return this;
  }

  createdAt(createdAt: Date): SaleBuilder {
    this.#sale.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): SaleBuilder {
    this.#sale.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): SaleBuilder {
    this.#sale.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): SaleBuilder {
    this.#sale.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): SaleBuilder {
    this.#sale.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): SaleBuilder {
    this.#sale.updatedBy = updatedBy;
    return this;
  }

  build(): Sale {
    return new Sale(
      this.#sale.id,
      this.#sale.product,
      this.#sale.order,
      this.#sale.amount,
      this.#sale.total,
      this.#sale.updatedAt,
      this.#sale.createdAt,
      this.#sale.deletedAt,
      this.#sale.updatedBy,
      this.#sale.createdBy,
      this.#sale.deletedBy,
    );
  }
}
