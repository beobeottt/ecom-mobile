import { IsNotEmpty } from 'class-validator';
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
export class Product {
    @PrimaryGeneratedColumn('uuid')
    ProductId!: string;

    @Column()
    @IsNotEmpty()
    ProductName!: string;

    @Column()
    @IsNotEmpty()
    description!: string;

    @Column()
    @IsNotEmpty()
    price!: number;

    @Column()
    @IsNotEmpty()
    brand!: string;

    @Column()
    @IsNotEmpty()
    quantity!: number;

    @Column({ enum: ['New Product', 'Best Seller', 'Sale'], default: 'New Product' })
    typeProduct!: TypeProduct;

    @Column({ nullable: true })
    imgUrl!: string;

    @Column({ type: 'json', nullable: true })
    variants!: ProductVariant[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

}

export class ProductVariant {
    @PrimaryColumn()
    id?: string;

    @Column()
    @IsNotEmpty()
    label!: string;

    @Column()
    @IsNotEmpty()
    price!: number;

    @Column()
    @IsNotEmpty()
    quantity!: number;

    @Column()
    sku?: string;

    @Column()
    image?: string;
}


