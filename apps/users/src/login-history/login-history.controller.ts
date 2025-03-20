import { Controller } from '@nestjs/common/decorators';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLoginHistoryDto } from './dto/create-login-history.dto';
import { UpdateLoginHistoryDto } from './dto/update-login-history.dto';
import { LoginHistoryService } from './login-history.service';

@Controller('v1/login-history')
export class LoginHistoryController {
  constructor(private readonly loginHistoryService: LoginHistoryService) {}

  @MessagePattern('createLoginHistory')
  create(@Payload() createLoginHistoryDto: CreateLoginHistoryDto) {
    return this.loginHistoryService.create(createLoginHistoryDto);
  }

  @MessagePattern('findAllLoginHistory')
  findAll() {
    return this.loginHistoryService.findAll();
  }

  @MessagePattern('findLoginHistory')
  findOne(@Payload('id') id: string) {
    return this.loginHistoryService.findOne(+id);
  }

  @MessagePattern('updateLoginHistory')
  update(@Payload() payload: UpdateLoginHistoryDto & { id: string }) {
    const { id, ...updateLoginHistoryDto } = payload;
    return this.loginHistoryService.update(+id, updateLoginHistoryDto);
  }
}
