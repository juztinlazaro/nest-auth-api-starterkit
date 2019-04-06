import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { bycrpEncryp } from '@app/common/methods/encryptions.method';
import { IAuthenticationModel } from '@app/shared/model/authentication.model';
import { SignUpDto } from '../../dto/signup.dto';
import { ISignUpResponse } from '../../interface/signup.interface';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel('Authentication')
    private readonly authModel: Model<IAuthenticationModel>,
  ) {}

  async checkUserExist(username: string, email: string): Promise<boolean> {
    return await this.authModel
      .findOne({
        username,
        email,
      })
      .then(res => {
        if (!res) {
          return false;
        }
        return true;
      });
  }

  async signUp(credential: SignUpDto): Promise<ISignUpResponse> {
    const createNewUser = await new this.authModel({
      username: credential.username,
      email: credential.email,
      password: bycrpEncryp(credential.password),
    });

    return await createNewUser
      .save()
      .then(res => {
        return {
          statusCode: 200,
          message: `${res.username} successfully signup`,
          data: {
            email: res.email,
            username: res.username,
          },
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'sign up failed',
          data: error,
        };
      });
  }
}
