import { Controller } from "@nestjs/common";
import { AuthMsService } from "./auth-ms.service";
import type { User } from "./auth-ms.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("v1/auth")
export class AuthMsController {
  constructor(private readonly authMsService: AuthMsService) {}

  @MessagePattern("login")
  login(@Payload() body: { email: string; password: string }) {
    return this.authMsService.login(body);
  }

  @MessagePattern("protected")
  async protected() {
    return "This is protected data";
  }

  @MessagePattern("register")
  register(@Payload() newUser: User) {
    return this.authMsService.register(newUser);
  }
}
