import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nest-modules/mailer';
import { Model } from 'mongoose';

import { generateToken } from '@app/common/methods/encryptions.method';

import { VerificationTokenDto } from '../../dto/verification-token.dto';
import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectModel('VerificationToken')
    private readonly verifyTokenModel: Model<IVerificationTokenModel>,
    private readonly mailerService: MailerService,
  ) {}

  sendVerificationEmail(payload): void {
    this.mailerService.sendMail({
      to: payload.email,
      from: 'playground_nest@playground.com',
      subject: 'Verification account',
      text: 'Gooday',
      html: `<b><a href="http://localhost:3000/verification-token/${
        payload.token
      }" target="_blank">verify</a></b>`,
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
}
