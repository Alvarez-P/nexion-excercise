import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOG_REPOSITORY } from 'src/logs/constants';
import { TLogRepository } from '../logs.repository';
import { LogBuilder } from 'src/logs/domain/log.builder';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOG_REPOSITORY)
    private logRepository: TLogRepository,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const req = context.switchToHttp().getRequest();
    const body = req.method === 'GET' ? JSON.stringify(req.body) : null;
    const { statusCode } = req.res;
    const employeeId = req.user.id ?? req.user.dataValues.id;
    const logBuilder = new LogBuilder()
      .requestBody(body)
      .requestAction(req.method)
      .requestQuery(JSON.stringify(req.query))
      .requestPathParams(JSON.stringify(req.params))
      .requestPath(req.url)
      .responseCode(+statusCode)
      .employeeId(employeeId)
      .createdBy(employeeId)
      .updatedBy(employeeId);
    return next.handle().pipe(
      map(async (data) => {
        const log = logBuilder
          .responseBody(data ? JSON.stringify(data) : null)
          .elapsedTime(Date.now() - start)
          .build();
        await this.logRepository.create(log);
        console.log(`[Request] ${req.method} ${req.url} - ${statusCode}`);
        return data;
      }),
    );
  }
}
