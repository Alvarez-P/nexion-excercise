import { plainToInstance } from 'class-transformer';
import { BranchOffice } from './branch-office.entity';
import { v4 } from 'uuid';

export class BranchOfficeBuilder {
  readonly #branchOffice: BranchOffice;

  constructor(branchOffice?: BranchOffice) {
    const now = new Date();
    this.#branchOffice = branchOffice
      ? plainToInstance(BranchOffice, { ...branchOffice })
      : new BranchOffice(v4(), '', '', now, now, null, '', '', null);
  }

  id(id: string): BranchOfficeBuilder {
    this.#branchOffice.id = id;
    return this;
  }

  name(name: string): BranchOfficeBuilder {
    this.#branchOffice.name = name;
    return this;
  }

  address(address: string): BranchOfficeBuilder {
    this.#branchOffice.address = address;
    return this;
  }

  createdAt(createdAt: Date): BranchOfficeBuilder {
    this.#branchOffice.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): BranchOfficeBuilder {
    this.#branchOffice.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): BranchOfficeBuilder {
    this.#branchOffice.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): BranchOfficeBuilder {
    this.#branchOffice.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): BranchOfficeBuilder {
    this.#branchOffice.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): BranchOfficeBuilder {
    this.#branchOffice.updatedBy = updatedBy;
    return this;
  }

  build(): BranchOffice {
    return new BranchOffice(
      this.#branchOffice.id,
      this.#branchOffice.name,
      this.#branchOffice.address,
      this.#branchOffice.updatedAt,
      this.#branchOffice.createdAt,
      this.#branchOffice.deletedAt,
      this.#branchOffice.updatedBy,
      this.#branchOffice.createdBy,
      this.#branchOffice.deletedBy,
    );
  }
}
