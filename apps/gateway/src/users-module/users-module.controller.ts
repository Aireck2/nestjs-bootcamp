import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/users/src/users/dto/create-user.dto';
import { UpdateUserDto } from 'apps/users/src/users/dto/update-user.dto';

@Controller('v1/users')
export class UsersModuleController {
  constructor(@Inject('USERS_MS') private readonly usersClient: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send('create', createUserDto);
  }

  @Get()
  findAll() {
    return this.usersClient.send('findAll', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersClient.send('findOne', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersClient.send('update', { id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersClient.send('remove', { id });
  }
}
