import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtResponse } from './interfaces/jwt-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(@Req() request): Promise<JwtResponse> {
    return await this.authService.login(request.user);
  }
}
