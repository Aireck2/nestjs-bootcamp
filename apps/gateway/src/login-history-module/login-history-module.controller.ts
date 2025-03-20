import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
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

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoryClient.send(
      'createLoginHistory',
      createLoginHistoryDto,
    );
  }

  @Get()
  findAll() {
    return this.loginHistoryClient.send('findAllLoginHistory', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginHistoryClient.send('findLoginHistory', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoginHistoryDto: UpdateLoginHistoryDto,
  ) {
    return this.loginHistoryClient.send('updateLoginHistory', {
      id,
      ...updateLoginHistoryDto,
    });
  }
}
