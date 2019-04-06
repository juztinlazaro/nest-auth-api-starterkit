import { Controller, Post, Body } from '@nestjs/common';

import { SignUpService } from '../../service/signup/signup.service';
import { SignUpDto } from '../../dto/signup.dto';
import { ISignUpResponse } from '../../interface/signup.interface';
import { VerificationTokenService } from '../../service/verification-token/verification-token.service';

@Controller('sign-up')
export class SignUpController {
  constructor(
    private readonly signUpService: SignUpService,
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  @Post()
  async SignUp(@Body() credential: SignUpDto): Promise<ISignUpResponse> {
    return this.signUpService.signUp(credential).then(res => {
      this.verificationTokenService.createVerificationToken({
        email: res.data.email,
        authId: res.data._id,
      });
      return res;
    });
  }
}
