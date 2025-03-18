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
import { CreateLoginHistoryDto } from 'apps/users/src/login-history/dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from 'apps/users/src/login-history/dto/update-login-history.dto';

@Controller('v1/login-history')
export class LoginHistoryModuleController {
  constructor(
    @Inject('USERS_MS')
    private readonly loginHistoryClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoryClient.send('create', createLoginHistoryDto);
  }

  @Get()
  findAll() {
    return this.loginHistoryClient.send('findAll', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginHistoryClient.send('findOne', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoginHistoryDto: UpdateLoginHistoryDto,
  ) {
    return this.loginHistoryClient.send('update', {
      id,
      ...updateLoginHistoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginHistoryClient.send('remove', { id });
  }
}
