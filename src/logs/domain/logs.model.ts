import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { LOG_MODEL_NAME } from '../constants';
import { Log } from './log.entity';
import { EmployeeModel } from 'src/employees/domain/employee.model';
import { Employee } from 'src/employees/domain/employee.entity';

@Table({ modelName: LOG_MODEL_NAME, paranoid: true })
export class LogModel extends Model<Log> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  ip_address: string;

  @Column(DataType.INTEGER)
  elapsed_time: number;

  @Column
  updatedBy: string;

  @Column
  createdBy: string;

  @Column
  request_action: string;

  @Column
  request_path: string;

  @AllowNull
  @Column
  request_body: string;

  @AllowNull
  @Column
  request_query: string;

  @AllowNull
  @Column(DataType.TEXT('long'))
  response_body: string;

  @Column
  response_code: string;

  @AllowNull
  @Column
  deletedBy: string | null;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => EmployeeModel)
  @Column
  employeeId: string;

  @BelongsTo(() => EmployeeModel)
  employee: Employee;
}
