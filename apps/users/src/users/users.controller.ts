import { Controller, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern('findUser')
  findOne(@Payload('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @MessagePattern('updateUser')
  update(@Payload() payload: UpdateUserDto & { id: string }) {
    const { id, ...updateUserDto } = payload;
    return this.usersService.update(+id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
