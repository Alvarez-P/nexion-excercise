import { IBaseEntity } from 'src/core/domain/base.entity';
import { Employee } from 'src/employees/domain/employee.entity';

export class Log implements IBaseEntity {
  constructor(
    public id: string,
    public elapsed_time: number,
    public ip_address: string,
    public employeeId: string,
    public employee: Employee,
    public request_action: string,
    public request_path: string,
    public request_path_params: string | null,
    public request_body: string | null,
    public request_query: string | null,
    public response_body: string | null,
    public response_code: number,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
