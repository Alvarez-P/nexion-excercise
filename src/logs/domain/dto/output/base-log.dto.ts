import { Type } from 'class-transformer';
import { BaseEmployeeDto } from 'src/employees/domain/dto/output/base-employee.dto';

export class BaseLogDto {
  id: string;
  elapsed_time: number;
  ip_address: string;
  employeeId: string;
  request_action: string;
  request_path: string;
  request_path_params: string | null;
  request_body: string | null;
  request_query: string | null;
  response_body: string | null;
  response_code: number;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  updatedBy: string;
  createdBy: string;
  deletedBy: string | null;

  @Type(() => BaseEmployeeDto)
  employee: BaseEmployeeDto;
}
