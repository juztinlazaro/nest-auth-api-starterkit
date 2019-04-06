import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../../configurations/keys';

import { AccountVerificationController } from '@app/modules/verification-token/controller/account-verification.controller';
import { AccountVerificationService } from '@app/modules/verification-token/service/account-verification/account-verification.service';
import { ItemsController } from '@app/modules/items/controllers/items.controller';
import { ItemsService } from '@app/modules/items/services/items.service';
import { SchemaModule } from '@root/src/shared/schema/Schema.module';
import { SignUpController } from '@app/modules/authentication/controller/signup/signup.controller';
import { SignUpService } from '@app/modules/authentication/service/signup/signup.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.database),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: config.transport,
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/src/common/email-template',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    SchemaModule,
  ],
  controllers: [
    AppController,
    AccountVerificationController,
    ItemsController,
    SignUpController,
  ],
  providers: [
    AppService,
    AccountVerificationService,
    ItemsService,
    SignUpService,
  ],
})
export class AppModule {}
