import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('products')
@Unique(['title'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  shortDesc: string;

  @Column()
  quantity: number;

  @Column()
  category: string;
}
