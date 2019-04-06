import { Controller, Post, Body } from '@nestjs/common';

import { SignUpService } from '../../service/signup/signup.service';
import { SignUpDto } from '../../dto/signup.dto';
import { ISignUpResponse } from '../../interface/signup.interface';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  async SignUp(@Body() credential: SignUpDto): Promise<ISignUpResponse> {
    return this.signUpService.signUp(credential).then(res => {
      return res;
    });
  }
}
