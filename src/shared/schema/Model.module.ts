import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationSchema } from './authentication.schema';
import { ItemSchema } from './item.schema';
import { UserSchema } from './user.schema';
import { VerificationTokenSchema } from './verification-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Authentication',
        schema: AuthenticationSchema,
      },
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'VerificationToken',
        schema: VerificationTokenSchema,
      },
    ]),
  ],
})
export class ModelModule {}
