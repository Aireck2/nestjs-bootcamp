import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateUserDto } from 'apps/users/src/users/dto/create-user.dto';
import { UpdateUserDto } from 'apps/users/src/users/dto/update-user.dto';

@Controller('v1/users')
export class UsersModuleController {
  constructor(@Inject('USERS_MS') private readonly usersClient: ClientProxy) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send('createUser', createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersClient.send('findAllUsers', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersClient.send('findUser', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersClient.send('updateUser', { id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersClient.send('removeUser', { id });
  }
}
