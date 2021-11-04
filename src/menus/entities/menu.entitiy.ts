import { CoreEntity } from 'src/core/entities/core.entitiy';
import { Item } from 'src/items/entities/item.entitiy';
import { Tag } from 'src/tags/entities/tag.entitiy';
import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from './tag.entitiy';

@Entity()
export class Menu extends CoreEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isSold: boolean;

  @Column()
  badge: string;

  @OneToMany((_type) => Item, (item) => item.menu, { eager: true })
  items: Item[];

  @OneToMany((_type) => Tag, (tag) => tag.menu, { eager: true })
  tags: Tag[];

  @OneToMany((_type) => Category, (category) => category.menu, { eager: true })
  categories: Category[];
}
