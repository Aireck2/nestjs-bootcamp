import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username === "admin" && password === "1234") {
      return { name: "Erick", lastname: "Escriba" };
    }
  }
  generateToken(user: any) {
    const sign = { username: user.name, sub: 1 };
    return {
      accessToken: this.jwtService.sign(sign),
    };
  }
}
