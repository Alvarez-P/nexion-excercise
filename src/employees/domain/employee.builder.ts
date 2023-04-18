import { plainToInstance } from 'class-transformer';
import { Employee } from './employee.entity';

export class EmployeeBuilder {
  readonly #employee: Employee;

  constructor(employee?: Employee) {
    const now = new Date();
    this.#employee = employee
      ? plainToInstance(Employee, { ...employee })
      : new Employee('', '', '', now, 'user', now, now, null, '', '', null);
  }

  id(id: string): EmployeeBuilder {
    this.#employee.id = id;
    return this;
  }

  firstName(firstName: string): EmployeeBuilder {
    this.#employee.firstName = firstName;
    return this;
  }

  lastName(lastName: string): EmployeeBuilder {
    this.#employee.lastName = lastName;
    return this;
  }

  birthday(birthday: Date): EmployeeBuilder {
    this.#employee.birthday = birthday;
    return this;
  }

  role(role: 'user' | 'admin'): EmployeeBuilder {
    this.#employee.role = role;
    return this;
  }

  createdAt(createdAt: Date): EmployeeBuilder {
    this.#employee.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): EmployeeBuilder {
    this.#employee.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): EmployeeBuilder {
    this.#employee.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): EmployeeBuilder {
    this.#employee.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): EmployeeBuilder {
    this.#employee.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): EmployeeBuilder {
    this.#employee.updatedBy = updatedBy;
    return this;
  }

  build(): Employee {
    return new Employee(
      this.#employee.id,
      this.#employee.firstName,
      this.#employee.lastName,
      this.#employee.birthday,
      this.#employee.role,
      this.#employee.updatedAt,
      this.#employee.createdAt,
      this.#employee.deletedAt,
      this.#employee.updatedBy,
      this.#employee.createdBy,
      this.#employee.deletedBy,
    );
  }
}
