import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';

@Injectable()
export class AccountVerificationService {
  constructor(
    @InjectModel('VerificationToken')
    private readonly verificationTokenModel: Model<IVerificationTokenModel>,
  ) {}

  checkVerificationToken(token: string): Promise<void> {
    console.log('token', token);
    return this.verificationTokenModel
      .findOne({
        token,
      })
      .then(res => console.log('res', res));
  }
}
