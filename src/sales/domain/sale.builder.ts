import { plainToInstance } from 'class-transformer';
import { Sale } from './sale.entity';
import { Product } from 'src/products/domain/product.entity';
import { SaleOrderBuilder } from 'src/sale-orders/domain/sale-orders.builder';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { ProductBuilder } from 'src/products/domain/product.builder';
import { v4 } from 'uuid';

export class SaleBuilder {
  readonly #sale: Sale;

  constructor(sale?: Sale) {
    const now = new Date();
    const product = new ProductBuilder().build();
    const order = new SaleOrderBuilder().build();
    this.#sale = sale
      ? plainToInstance(Sale, { ...sale })
      : new Sale(
          v4(),
          '',
          product,
          '',
          order,
          0,
          0,
          now,
          now,
          null,
          '',
          '',
          null,
        );
  }

  id(id: string): SaleBuilder {
    this.#sale.id = id;
    return this;
  }

  productId(productId: string): SaleBuilder {
    this.#sale.productId = productId;
    return this;
  }

  product(product: Product): SaleBuilder {
    this.#sale.product = product;
    return this;
  }

  saleOrderId(saleOrderId: string): SaleBuilder {
    this.#sale.saleOrderId = saleOrderId;
    return this;
  }

  saleOrder(saleOrder: SaleOrder): SaleBuilder {
    this.#sale.saleOrder = saleOrder;
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
      this.#sale.productId,
      this.#sale.product,
      this.#sale.saleOrderId,
      this.#sale.saleOrder,
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
