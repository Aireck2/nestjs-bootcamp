import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

@Injectable()
export class AuthMsService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "password",
      role: "admin",
    },
  ];
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = this.users.find(
      (user) => user.email === email && user.password === pass
    );
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register({ ...newUser }: User): Promise<User> {
    const user = {
      id: this.users.length + 1,
      name: newUser.name,
      lastname: newUser.lastname,
      password: newUser.password,
      role: "user",
      email: newUser.email,
    };
    this.users.push(user);
    return user;
  }
}
