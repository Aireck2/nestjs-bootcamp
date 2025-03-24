import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateLoginHistoryDto } from 'apps/users/src/login-history/dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from 'apps/users/src/login-history/dto/update-login-history.dto';

@ApiTags('LoginHistory')
@Controller('v1/login-history')
export class LoginHistoryModuleController {
  constructor(
    @Inject('USERS_MS')
    private readonly loginHistoryClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoryClient.send(
      'createLoginHistory',
      createLoginHistoryDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.loginHistoryClient.send('findAllLoginHistory', paginationDto);
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
