import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { AuthService } from "./auth/auth.service";

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }
  @Post("login")
  login(@Body() body: { username: string; password: string }) {
    const user = this.authService.validateUser(body.username, body.password);
    if (!user) {
      console.log("Usuario no autorizado");
      throw new UnauthorizedException();
    }
    return this.authService.generateToken(user).accessToken;
  }
}
