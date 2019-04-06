import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item.dto';
import { ItemsService } from '../services/items.service';
import { IItemResponse } from '../interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<IItemResponse[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<IItemResponse> {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<IItemResponse> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(
    @Param('id') id,
    @Body() updateItemDto: CreateItemDto,
  ): Promise<IItemResponse> {
    return this.itemsService.updateOne(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<IItemResponse> {
    return this.itemsService.deleteOne(id);
  }
}
