import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IItemResponse } from '../interfaces/item.interface';
import { IItemModel } from '@app/shared/model/item.model';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<IItemModel>,
  ) {}

  async create(item: CreateItemDto): Promise<IItemResponse> {
    const createdItem = new this.itemModel(item);
    return await createdItem
      .save()
      .then(res => {
        return {
          statusCode: 201,
          message: 'item successfully created',
          data: res,
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'item create error',
          data: error,
        };
      });
  }

  async findAll(): Promise<IItemResponse[]> {
    return await this.itemModel
      .find()
      .then(res => {
        if (!res) {
          return {
            statusCode: 200,
            message: 'items not found',
          };
        }

        return {
          statusCode: 201,
          message: 'item successfully find all',
          data: res,
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'item find error',
          data: error,
        };
      });
  }

  async findOne(id: string): Promise<IItemResponse> {
    return await this.itemModel
      .findOne({ _id: id })
      .then(res => {
        if (!res) {
          return {
            statusCode: 200,
            message: 'item not found',
          };
        }

        return {
          statusCode: 201,
          message: 'item successfully find',
          data: res,
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'item find all error',
          data: error,
        };
      });
  }

  async updateOne(id: string, item: CreateItemDto): Promise<IItemResponse> {
    return await this.itemModel
      .updateOne({ _id: id }, item)
      .then(res => {
        if (!res) {
          return {
            statusCode: 200,
            message: 'item not found',
          };
        }

        return {
          statusCode: 201,
          message: 'item successfully update',
          data: res,
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'item update error',
          data: error,
        };
      });
  }

  async deleteOne(id: string): Promise<IItemResponse> {
    return await this.itemModel
      .deleteOne({ _id: id })
      .then(res => {
        if (!res) {
          return {
            statusCode: 200,
            message: 'item not found',
          };
        }

        return {
          statusCode: 201,
          message: 'item successfully deleted',
          data: res,
        };
      })
      .catch(error => {
        return {
          statusCode: 400,
          message: 'item delete error',
          data: error,
        };
      });
  }
}
