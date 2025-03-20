import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return {
      data: await this.userRepository.save(createUserDto),
    };
  }

  async findAll() {
    console.log('findAll');
    return {
      data: await this.userRepository.find(),
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user.data, updateUserDto);

    return {
      data: await this.userRepository.save(user.data),
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    Object.assign(user.data, { isActive: false });

    return {
      data: await this.userRepository.save(user.data),
    };
  }
}
