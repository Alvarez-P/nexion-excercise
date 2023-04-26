import { EmployeeRole } from 'src/core/constants';

export interface TokenPayload {
  userName: string;
  sub: string;
  role: EmployeeRole;
  token_type: 'access_token' | 'refresh_token';
}
