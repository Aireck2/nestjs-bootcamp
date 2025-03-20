import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PER_PAGE } from 'apps/common/constants';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { getPageInfo } from 'apps/common/utils';
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

  async findAll(pagination: PaginationDto) {
    const { page = 1, per_page = PER_PAGE } = pagination;

    const [data, total] = await this.userRepository.findAndCount({
      take: per_page,
      skip: (page - 1) * per_page,
    });

    const pageInfo = getPageInfo(total, page, per_page);

    return { pageInfo, data };
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
