import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemModule } from '@app/modules/items/items.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../../configurations/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
