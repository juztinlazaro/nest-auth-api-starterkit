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
        return this.verifyAccount(res.authId);
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
      .then(res => {
        this.deleteVerificationToken(authId);

        return {
          statusCode: 200,
          message: 'account verified',
          data: res,
        };
      })
      .catch(error => console.log('account verified****error***', error));
  }

  deleteVerificationToken(authId: string): Promise<void> {
    return this.verificationTokenModel
      .deleteOne({ authId })
      .then(res => console.log('deleteVerificationToken', res))
      .catch(error => console.log('deleteVerificationToken errorrr'));
  }
}
