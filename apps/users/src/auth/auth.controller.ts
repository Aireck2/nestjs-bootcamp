import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  login(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
