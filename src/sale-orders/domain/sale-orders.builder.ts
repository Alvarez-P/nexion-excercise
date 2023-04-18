import { plainToInstance } from 'class-transformer';
import { SaleOrder } from './sale-orders.entity';
import { BranchOfficeBuilder } from 'src/branch-offices/domain/branch-office.builder';
import { EmployeeBuilder } from 'src/employees/domain/employee.builder';
import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { Employee } from 'src/employees/domain/employee.entity';

export class SaleOrderBuilder {
  readonly #order: SaleOrder;

  constructor(order?: SaleOrder) {
    const now = new Date();
    const branch = new BranchOfficeBuilder().build();
    const seller = new EmployeeBuilder().build();
    this.#order = order
      ? plainToInstance(SaleOrder, { ...order })
      : new SaleOrder('', branch, seller, 0, now, now, null, '', '', null);
  }

  id(id: string): SaleOrderBuilder {
    this.#order.id = id;
    return this;
  }

  branchOffice(branchOffice: BranchOffice): SaleOrderBuilder {
    this.#order.branchOffice = branchOffice;
    return this;
  }

  seller(seller: Employee): SaleOrderBuilder {
    this.#order.seller = seller;
    return this;
  }

  total(total: number): SaleOrderBuilder {
    this.#order.total = total;
    return this;
  }

  createdAt(createdAt: Date): SaleOrderBuilder {
    this.#order.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): SaleOrderBuilder {
    this.#order.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): SaleOrderBuilder {
    this.#order.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): SaleOrderBuilder {
    this.#order.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): SaleOrderBuilder {
    this.#order.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): SaleOrderBuilder {
    this.#order.updatedBy = updatedBy;
    return this;
  }

  build(): SaleOrder {
    return new SaleOrder(
      this.#order.id,
      this.#order.branchOffice,
      this.#order.seller,
      this.#order.total,
      this.#order.updatedAt,
      this.#order.createdAt,
      this.#order.deletedAt,
      this.#order.updatedBy,
      this.#order.createdBy,
      this.#order.deletedBy,
    );
  }
}
