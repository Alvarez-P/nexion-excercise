import { Employee } from './employee.entity';

type FieldsToIgnore = 'password' | 'deletedAt' | 'deletedBy';
export type EmployeeFilters = Omit<Employee, FieldsToIgnore>;
