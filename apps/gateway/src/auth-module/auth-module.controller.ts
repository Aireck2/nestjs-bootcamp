import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { lastValueFrom } from "rxjs";

@Controller("v1/auth")
export class AuthModuleController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy
  ) {}

  @Post("login")
  async login(@Body() body) {
    return await lastValueFrom(this.authClient.send("login", body));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("protected")
  async protected() {
    return await lastValueFrom(this.authClient.send("protected", {}));
  }
}
