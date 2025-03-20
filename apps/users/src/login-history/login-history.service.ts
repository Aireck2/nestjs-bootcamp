import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginHistoryDto } from './dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from './dto/update-login-history.dto';
import { LoginHistoryEntity } from './entities/login-history.entity';

@Injectable()
export class LoginHistoryService {
  constructor(
    @InjectRepository(LoginHistoryEntity)
    private readonly loginHistoryRepository: Repository<LoginHistoryEntity>,
  ) {}
  async create(createLoginHistoryDto: CreateLoginHistoryDto) {
    return {
      data: await this.loginHistoryRepository.save(createLoginHistoryDto),
    };
  }

  async findAll() {
    return {
      data: await this.loginHistoryRepository.find(),
    };
  }

  async findOne(id: number) {
    const loginHistory = await this.loginHistoryRepository.findOne({
      where: { id },
    });

    if (!loginHistory) {
      throw new NotFoundException('LoginHistory not found');
    }

    return {
      data: loginHistory,
    };
  }

  async update(id: number, updateLoginHistoryDto: UpdateLoginHistoryDto) {
    const loginHistory = await this.findOne(id);
    Object.assign(loginHistory.data, updateLoginHistoryDto);

    return {
      data: await this.loginHistoryRepository.save(loginHistory.data),
    };
  }
}
