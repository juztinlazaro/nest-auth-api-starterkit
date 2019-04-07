import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { decodeToken } from '@app/common/methods/encryptions.method';

import { IVerificationTokenModel } from '@app/shared/model/verification-token.model';
import { IAuthenticationModel } from '@app/shared/model/authentication.model';
import { IUserModel } from '@root/src/shared/model/user.model';
import { CreateUserProfileDto } from '../../dto/createUserProfile.dto';

@Injectable()
export class AccountVerificationService {
  constructor(
    @InjectModel('VerificationToken')
    private readonly verificationTokenModel: Model<IVerificationTokenModel>,
    @InjectModel('Authentication')
    private readonly authModel: Model<IAuthenticationModel>,
    @InjectModel('User')
    private readonly userModel: Model<IUserModel>,
  ) {}

  checkVerificationToken(token: string): Promise<void> {
    const userInfo = decodeToken(token);
    return this.verificationTokenModel
      .findOne({
        token,
      })
      .then(res => {
        return this.verifyAccount(userInfo);
      })
      .catch(error => console.log('error****', error));
  }

  verifyAccount(userInfo: {
    username: string;
    email: string;
    authId: string;
  }): Promise<void> {
    console.log('userInfo***', userInfo);
    return this.authModel
      .updateOne(
        {
          _id: userInfo.authId,
        },
        { isVerified: true },
      )
      .then(res => {
        this.createUserProfile({
          email: userInfo.email,
          username: userInfo.username,
          authId: userInfo.authId,
        });

        return {
          statusCode: 200,
          message: 'account verified',
          data: res,
        };
      })
      .catch(error => console.log('account verified****error***', error));
  }

  async createUserProfile(userInfo: CreateUserProfileDto): Promise<void> {
    const newUser = new this.userModel(userInfo);
    return await newUser
      .save()
      .then(res => {
        console.log('createUserProfile success', res);
        this.deleteVerificationToken(res.authId);
      })
      .catch(error => {
        console.log('createUserProfile error***', error);
      });
  }

  deleteVerificationToken(authId: string): Promise<void> {
    return this.verificationTokenModel
      .deleteOne({ authId })
      .then(res => console.log('deleteVerificationToken', res))
      .catch(error => console.log('deleteVerificationToken errorrr'));
  }
}
