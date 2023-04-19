import { EmployeeRole } from 'src/core/constants';

export interface TokenPayload {
  userName: string;
  sub: string;
  role: EmployeeRole;
}
