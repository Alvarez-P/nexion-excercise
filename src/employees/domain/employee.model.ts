import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Employee } from './employee.entity';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { EMPLOYEE_MODEL_NAME } from '../constants';

@Table({ modelName: EMPLOYEE_MODEL_NAME, timestamps: true })
export class EmployeeModel extends Model<Employee> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column(DataType.DATE)
  birthday: Date;

  @Column({ type: DataType.STRING, values: ['user', 'admin'] })
  role: 'user' | 'admin';

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
