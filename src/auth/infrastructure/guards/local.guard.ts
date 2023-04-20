import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { userName, password } = request.body;
    if (!userName) throw new BadRequestException('userName is required');
    if (!password) throw new BadRequestException('password is required');
    if (err || !user) throw new UnauthorizedException();
    return user;
  }
}
