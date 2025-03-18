import { Post, Body, Inject, Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from 'apps/users/src/auth/dto/create-auth.dto';

@Controller('v1/auth')
export class AuthModuleController {
  constructor(@Inject('USERS_MS') private readonly authClient: ClientProxy) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authClient.send('login', createAuthDto);
  }
}
