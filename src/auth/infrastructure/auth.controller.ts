import {
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Employee } from 'src/employees/domain/employee.entity';
import { AuthService } from '../application/auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';
import { RequestSignInDto } from '../domain/dto/input/signin.dto';
import { RefreshAuth } from './decorators/refresh.decorator';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: () => RequestSignInDto })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @HttpCode(200)
  async signin(@Request() req: { user: Employee }) {
    return this.authService.signin(req.user);
  }

  @RefreshAuth()
  @Post('refresh')
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @HttpCode(200)
  async refresh(@Request() req: { user: Employee }) {
    return this.authService.refresh(req.user);
  }
}
