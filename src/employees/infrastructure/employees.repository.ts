import { EMPLOYEE_REPOSITORY } from '../constants';
import { EmployeeModel } from '../domain/employee.model';

export const EmployeeRepository = {
  provide: EMPLOYEE_REPOSITORY,
  useValue: EmployeeModel,
};

export type TEmployeeRepository = typeof EmployeeModel;
