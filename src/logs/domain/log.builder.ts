import { plainToInstance } from 'class-transformer';
import { Log } from './log.entity';
import { v4 } from 'uuid';
import { EmployeeBuilder } from 'src/employees/domain/employee.builder';
import { Employee } from 'src/employees/domain/employee.entity';

export class LogBuilder {
  readonly #log: Log;

  constructor(log?: Log) {
    const now = new Date();
    this.#log = log
      ? plainToInstance(Log, { ...log })
      : new Log(
          v4(),
          0,
          '',
          '',
          new EmployeeBuilder().build(),
          '',
          '',
          null,
          null,
          null,
          null,
          200,
          now,
          now,
          null,
          '',
          '',
          null,
        );
  }

  id(id: string): LogBuilder {
    this.#log.id = id;
    return this;
  }

  elapsedTime(elapsed_time: number): LogBuilder {
    this.#log.elapsed_time = elapsed_time;
    return this;
  }

  ipAddress(ip_address: string): LogBuilder {
    this.#log.ip_address = ip_address;
    return this;
  }

  employeeId(employeeId: string): LogBuilder {
    this.#log.employeeId = employeeId;
    return this;
  }

  employee(employee: Employee): LogBuilder {
    this.#log.employee = employee;
    return this;
  }

  requestAction(request_action: string): LogBuilder {
    this.#log.request_action = request_action;
    return this;
  }

  requestPath(request_path: string): LogBuilder {
    this.#log.request_path = request_path;
    return this;
  }

  requestPathParams(request_path_params: string | null): LogBuilder {
    this.#log.request_path_params = request_path_params;
    return this;
  }

  requestBody(request_body: string | null): LogBuilder {
    this.#log.request_body = request_body;
    return this;
  }

  requestQuery(request_query: string | null): LogBuilder {
    this.#log.request_query = request_query;
    return this;
  }

  responseBody(response_body: string | null): LogBuilder {
    this.#log.response_body = response_body;
    return this;
  }

  responseCode(response_code: number): LogBuilder {
    this.#log.response_code = response_code;
    return this;
  }

  createdAt(createdAt: Date): LogBuilder {
    this.#log.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date): LogBuilder {
    this.#log.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null): LogBuilder {
    this.#log.deletedAt = deletedAt;
    return this;
  }

  createdBy(createdBy: string): LogBuilder {
    this.#log.createdBy = createdBy;
    return this;
  }

  deletedBy(deletedBy: string): LogBuilder {
    this.#log.deletedBy = deletedBy;
    return this;
  }

  updatedBy(updatedBy: string): LogBuilder {
    this.#log.updatedBy = updatedBy;
    return this;
  }

  build(): Log {
    return new Log(
      this.#log.id,
      this.#log.elapsed_time,
      this.#log.ip_address,
      this.#log.employeeId,
      this.#log.employee,
      this.#log.request_action,
      this.#log.request_path,
      this.#log.request_path_params,
      this.#log.request_body,
      this.#log.request_query,
      this.#log.response_body,
      this.#log.response_code,
      this.#log.updatedAt,
      this.#log.createdAt,
      this.#log.deletedAt,
      this.#log.updatedBy,
      this.#log.createdBy,
      this.#log.deletedBy,
    );
  }
}
