import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../configurations/keys';
import { ItemModule } from '../items/items.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
