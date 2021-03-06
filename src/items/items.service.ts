import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  createItem(createItemDto: CreateItemDto, menu: Menu): Promise<Item> {
    return this.itemsRepository.createItem(createItemDto, menu);
  }

  async deleteItem(itemId: number): Promise<{ message: string }> {
    const item: Item = await this.itemsRepository.findOne(itemId);

    if (!item) {
      throw new NotFoundException('유효한 항목 id가 아닙니다.');
    }

    await this.itemsRepository.delete({ id: itemId });
    return { message: '항목 삭제 완료' };
  }

  async updateItem(updateItemDto: UpdateItemDto): Promise<Item> {
    const item: Item = await this.itemsRepository.findOne(updateItemDto.itemId);
    const { name, size, price, isSold } = updateItemDto;

    item.name = name;
    item.size = size;
    item.price = price;
    item.isSold = isSold;

    await this.itemsRepository.save(item);
    return item;
  }
}
