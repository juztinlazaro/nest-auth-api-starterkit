import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../../configurations/keys';
import { AuthenticationSchema } from '../shared/schema/authentication.schema';
import { ItemSchema } from '@app/shared/schema/item.schema';
import { VerificationTokenSchema } from '@app/shared/schema/verification-token.schema';

import { ItemsController } from '@app/modules/items/controllers/items.controller';
import { ItemsService } from '@app/modules/items/services/items.service';
import { SignUpController } from '@app/modules/authentication/controller/signup/signup.controller';
import { SignUpService } from '@app/modules/authentication/service/signup/signup.service';
import { VerificationTokenService } from '@app/modules/authentication/service/verification-token/verification-token.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.database),
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
        name: 'VerificationToken',
        schema: VerificationTokenSchema,
      },
    ]),
  ],
  controllers: [AppController, ItemsController, SignUpController],
  providers: [
    AppService,
    ItemsService,
    SignUpService,
    VerificationTokenService,
  ],
})
export class AppModule {}
