import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginHistoryService } from '../login-history/login-history.service';
import { UserEntity } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // @Inject(LoginHistoryService)
    private readonly loginHistoryService: LoginHistoryService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    // Check if user already exists
    const user = await this.findUserByEmail(loginDto.email);
    if (!user) {
      return { message: 'Email or password is incorrect', data: null };
      // throw new UnauthorizedException('Email or password is incorrect');
    }

    // Match password
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      return { message: 'Email or password is incorrect', data: null };
      // throw new UnauthorizedException('Email or password is incorrect');
    }

    // Create login history
    await this.loginHistoryService.create({
      userId: user.id,
    });

    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );
    return {
      data: {
        accessToken,
      },
    };
  }

  async signup(signupDto: SignupDto) {
    // Check if user already exists
    const user = await this.findUserByEmail(signupDto.email);
    if (user) {
      // throw new BadRequestException('Email already exists');
      return { message: 'Email already exists', data: null };
    }
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user instance
    const newUser = this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      role: 'user',
    });
    // Save user
    await this.userRepository.save(newUser);

    return {
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }
  async me(userId: number) {
    return {
      data: await this.userRepository.findOne({
        where: { id: userId },
      }),
    };
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }
}
