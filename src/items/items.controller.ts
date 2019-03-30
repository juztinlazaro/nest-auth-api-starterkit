import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'Hello World Item';
  }

  @Get(':id')
  // findOne(@Param('id') id): string {
  //   return id;
  // }
  findOne(@Param() param): string {
    return param;
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): string {
    return `Name: ${createItemDto.name} Desc: ${
      createItemDto.description
    } Qty: ${createItemDto.qty}`;
  }

  @Put(':id')
  put(
    @Param() param,
    @Body() createItemDto: CreateItemDto,
  ): {
    message: string;
    status: number;
    item: CreateItemDto;
  } {
    return {
      message: `ID of ${param.id} is updated`,
      status: 201,
      item: {
        ...createItemDto,
      },
    };
  }

  @Delete(':id')
  delete(
    @Param() param,
  ): {
    message: string;
    status: number;
  } {
    return {
      message: `ID of ${param.id} is delete`,
      status: 200,
    };
  }
}
