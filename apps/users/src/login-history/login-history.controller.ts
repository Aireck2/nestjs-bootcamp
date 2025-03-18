import { LoginHistoryService } from './login-history.service';
import { CreateLoginHistoryDto } from './dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from './dto/update-login-history.dto';
import { Controller } from '@nestjs/common/decorators';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('v1/login-history')
export class LoginHistoryController {
  constructor(private readonly loginHistoryService: LoginHistoryService) {}

  @MessagePattern('create')
  create(@Payload() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoryService.create(createLoginHistoryDto);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.loginHistoryService.findAll();
  }

  @MessagePattern('findOne')
  findOne(@Payload('id') id: string) {
    return this.loginHistoryService.findOne(+id);
  }

  @MessagePattern('update')
  update(@Payload() payload: UpdateLoginHistoryDto & { id: string }) {
    const { id, ...updateLoginHistoryDto } = payload;
    return this.loginHistoryService.update(+id, updateLoginHistoryDto);
  }

  @MessagePattern(':id')
  remove(@Payload('id') id: string) {
    return this.loginHistoryService.remove(+id);
  }
}
