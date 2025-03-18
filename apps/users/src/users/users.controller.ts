import { Controller, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOne')
  findOne(@Payload('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @MessagePattern('update')
  update(@Payload() payload: UpdateUserDto & { id: string }) {
    const { id, ...updateUserDto } = payload;
    return this.usersService.update(+id, updateUserDto);
  }

  @MessagePattern('remove')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
