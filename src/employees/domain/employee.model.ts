import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { EMPLOYEE_MODEL_NAME } from '../constants';
import { EmployeeRole } from 'src/core/constants';
import { Employee } from './employee.entity';

@Table({ modelName: EMPLOYEE_MODEL_NAME, timestamps: true })
export class EmployeeModel extends Model<Employee> {
  @PrimaryKey
  @Column
  id: string;

  @Unique
  @Column
  userName: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column(DataType.DATE)
  birthday: Date;

  @Column({ type: DataType.STRING, values: ['user', 'admin'] })
  role: EmployeeRole;

  @Column
  updatedBy: string;

  @Column
  createdBy: string;

  @AllowNull
  @Column
  deletedBy: string | null;

  @HasMany(() => SaleOrderModel)
  saleOrders: SaleOrder[];
}
