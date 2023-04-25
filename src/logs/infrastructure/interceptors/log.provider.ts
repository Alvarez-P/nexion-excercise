import { LOG_PROVIDER } from 'src/logs/constants';
import { LoggingInterceptor } from './log.interceptor';

export const LogProvider = {
  provide: LOG_PROVIDER,
  useClass: LoggingInterceptor,
};
