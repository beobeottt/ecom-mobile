import { TypeProduct } from 'src/common/enums/product.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class Product
{
    @PrimaryGeneratedColumn()
    ProductId: string;

    @Column({nullable: false})
    ProductName: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    brand: string;

    @Column({nullable: false})
    quantity: number;

    @Column({ enum:['New Product', 'Best Seller', 'Sale'], default: 'New Product'})
    typeProduct: TypeProduct;

    @Column()
    imgUrl: string;

    @Column({ type: 'json', nullable: true })
    variants: ProductVariant[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

}

export class ProductVariant
{
    @PrimaryColumn()
    id?: string;

    @Column()
    label: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    sku?: string;

    @Column()
    image?: string;
}


