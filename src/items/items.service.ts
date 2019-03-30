import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '13132131312312',
      name: 'Item one',
      description: 'something one',
      qty: 312,
    },
    {
      id: '312312',
      name: 'Item two',
      description: 'something two',
      qty: 312,
    },
  ];
}
