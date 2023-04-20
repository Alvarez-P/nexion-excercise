import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Employee } from 'src/employees/domain/employee.entity';
import { AuthService } from '../application/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: { user: Employee }) {
    return this.authService.signin(req.user);
  }
}
