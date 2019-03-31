import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Item } from './interfaces/item.interface';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async create(item: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(item);
    return await createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async updateOne(id: string, item: Item): Promise<CreateItemDto> {
    return await this.itemModel.updateOne({ _id: id }, item);
  }

  async deleteOne(id: string): Promise<Item> {
    return await this.itemModel.deleteOne({ _id: id });
  }
}
