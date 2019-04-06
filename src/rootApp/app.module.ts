import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../../configurations/keys';
import { ItemSchema } from '@app/shared/schema/item.schema';

import { AuthenticationSchema } from '../shared/schema/authentication.schema';

import { ItemsController } from '@app/modules/items/controllers/items.controller';
import { ItemsService } from '@app/modules/items/services/items.service';
import { SignUpController } from '@app/modules/authentication/controller/signup/signup.controller';
import { SignUpService } from '@app/modules/authentication/service/signup/signup.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.database),
    MongooseModule.forFeature([
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'Authentication',
        schema: AuthenticationSchema,
      },
    ]),
  ],
  controllers: [AppController, ItemsController, SignUpController],
  providers: [AppService, ItemsService, SignUpService],
})
export class AppModule {}
