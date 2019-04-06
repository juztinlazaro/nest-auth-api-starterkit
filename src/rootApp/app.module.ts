import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../../configurations/keys';
import { ItemSchema } from '@app/shared/schema/item.schema';

import { ItemsController } from '@app/modules/items/controllers/items.controller';
import { ItemsService } from '@app/modules/items/services/items.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.database),
    MongooseModule.forFeature([
      {
        name: 'Item',
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {}
