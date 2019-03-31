import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './configurations/keys';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
