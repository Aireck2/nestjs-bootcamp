import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from 'apps/users/src/auth/dto/login.dto';
import { SignupDto } from 'apps/users/src/auth/dto/signup.dto';
import { AuthGuard } from './auth-module.guard';

@Controller('v1/auth')
export class AuthModuleController {
  constructor(@Inject('USERS_MS') private readonly authClient: ClientProxy) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authClient.send('login', loginDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authClient.send('signup', signupDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req: { user: { userId: number } }) {
    return this.authClient.send('me', { userId: req.user.userId });
  }
}
