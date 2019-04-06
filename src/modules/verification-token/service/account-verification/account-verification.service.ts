import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';
import { IAuthenticationModel } from '@root/src/shared/model/authentication.model';

@Injectable()
export class AccountVerificationService {
  constructor(
    @InjectModel('VerificationToken')
    private readonly verificationTokenModel: Model<IVerificationTokenModel>,
    @InjectModel('Authentication')
    private readonly authModel: Model<IAuthenticationModel>,
  ) {}

  checkVerificationToken(token: string): Promise<void> {
    return this.verificationTokenModel
      .findOne({
        token,
      })
      .then(res => {
        console.log('res***', res);
        this.verifyAccount(res.authId);
      })
      .catch(error => console.log('error****', error));
  }

  verifyAccount(authId: string): Promise<void> {
    return this.authModel
      .updateOne(
        {
          _id: authId,
        },
        { isVerified: true },
      )
      .then(() => this.deleteVerificationToken(authId));
  }

  deleteVerificationToken(authId: string): Promise<void> {
    return this.verificationTokenModel.deleteOne({ authId });
  }
}
