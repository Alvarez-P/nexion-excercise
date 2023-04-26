import { Employee } from 'src/employees/domain/employee.entity';
import { factory } from './factory';
import { v4 } from 'uuid';
import { CreateEmployeeDto } from 'src/employees/domain/dto/input/create-employee.dto';
import { encrypt } from './encrypt';

const now = new Date();
export const employeeFactory = factory<Employee>({
  id: v4(),
  userName: 'esteban98',
  firstName: 'Esteban',
  lastName: 'Alvarez',
  password: encrypt('aeAP1998_'),
  role: 'admin',
  birthday: new Date('1998-09-29T01:00:00.000Z'),
  updatedAt: now,
  createdAt: now,
  deletedAt: null,
  updatedBy: 'root',
  createdBy: 'root',
  deletedBy: null,
});

export const createEmployeeDtoFactory = factory<CreateEmployeeDto>({
  userName: 'esteban98',
  firstName: 'Esteban',
  lastName: 'Alvarez',
  password: 'aeAP1998_',
  birthday: new Date('1998-09-29T01:00:00.000Z'),
  role: 'admin',
});
