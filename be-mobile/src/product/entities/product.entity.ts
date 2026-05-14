import { IsNotEmpty } from 'class-validator';
import { TypeProduct } from 'src/common/enums/product.enum';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  ProductId!: string;

  @Column()
  @IsNotEmpty()
  ProductName!: string;

  @Column('text')
  @IsNotEmpty()
  description!: string;

  @Column('decimal')
  @IsNotEmpty()
  price!: number;

  @Column()
  @IsNotEmpty()
  brand!: string;

  @Column()
  @IsNotEmpty()
  quantity!: number;

  @Column({
    type: 'enum',
    enum: TypeProduct,
    default: TypeProduct.NewProduct,
  })
  typeProduct!: TypeProduct;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ type: 'jsonb', default: [] })
  images!: string[];

  @Column({ type: 'jsonb', default: [] })
  variants!: ProductVariant[];

  @Column({ type: 'jsonb', default: [] })
  colors!: string[];

  @Column({ nullable: true })
  coverage?: string;

  @Column({ nullable: true })
  finishType?: string;

  @Column()
  category!: string;

  @Column({
    type: 'decimal',
    default: 5,
  })
  rating!: number;

  @Column({
    default: 0,
  })
  sold!: number;

  @Column({
    default: 0,
  })
  discount!: number;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export class ProductVariant {
  id?: string;

  label!: string;

  price!: number;

  quantity!: number;

  sku?: string;

  image?: string;
}