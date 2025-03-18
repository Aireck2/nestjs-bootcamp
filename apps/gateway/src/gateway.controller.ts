import { Body, Controller, Get } from "@nestjs/common";
import { GatewayService } from "./gateway.service";

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(@Body() body: any): string {
    console.log(body, "Controller:body");
    return this.gatewayService.getHello();
  }
}
