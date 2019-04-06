import { Controller, Get, Param } from '@nestjs/common';
import { AccountVerificationService } from '../service/account-verification/account-verification.service';

@Controller('account-verification')
export class AccountVerificationController {
  constructor(
    private readonly accountVerificationService: AccountVerificationService,
  ) {}

  @Get(':token')
  async checkVerificationModel(@Param('token') token): Promise<void> {
    return this.accountVerificationService.checkVerificationToken(token);
  }
}
