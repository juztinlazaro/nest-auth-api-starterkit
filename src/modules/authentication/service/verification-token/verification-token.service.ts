import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { generateToken } from '@app/common/methods/encryptions.method';

import { VerificationTokenDto } from '../../dto/verification-token.dto';
import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectModel('VerificationToken')
    private readonly verifyTokenModel: Model<IVerificationTokenModel>,
  ) {}

  async createVerificationToken(data: VerificationTokenDto): Promise<void> {
    const createVerificationToken = new this.verifyTokenModel({
      token: generateToken(data),
      email: data.email,
      authId: data.authId,
    });

    return await createVerificationToken
      .save()
      .then(res => {
        console.log('createVerificationToken success', res);
      })
      .catch(error => {
        console.log('createVerificationToken error', error);
      });
  }
}
