import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nest-modules/mailer';
import { Model } from 'mongoose';

import { bycrpEncryp } from '@app/common/methods/encryptions.method';
import { generateToken } from '@app/common/methods/encryptions.method';

import { IAuthenticationModel } from '@app/shared/model/authentication.model';
import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';

import { SignUpDto } from '../../dto/signup.dto';
import { VerificationTokenDto } from '../../dto/verification-token.dto';

import { ISignUpResponse } from '../../interface/signup.interface';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel('Authentication')
    private readonly authModel: Model<IAuthenticationModel>,
    @InjectModel('VerificationToken')
    private readonly verifyTokenModel: Model<IVerificationTokenModel>,
    private readonly mailerService: MailerService,
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
        this.createVerificationToken({
          email: res.email,
          authId: res._id,
        });

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

  async createVerificationToken(data: VerificationTokenDto): Promise<void> {
    const createVerificationToken = new this.verifyTokenModel({
      token: generateToken(data),
      email: data.email,
      authId: data.authId,
    });

    return await createVerificationToken
      .save()
      .then(res => {
        this.sendVerificationEmail(res);
        console.log('createVerificationToken success', res);
      })
      .catch(error => {
        console.log('createVerificationToken error', error);
      });
  }

  sendVerificationEmail(payload): void {
    this.mailerService.sendMail({
      to: payload.email,
      from: 'playground_nest@playground.com',
      subject: 'Verification account',
      text: 'Gooday',
      html: `<b><a href="http://localhost:3000/account-verification/${
        payload.token
      }" target="_blank">verify</a></b>`,
    });
  }
}
