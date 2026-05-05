import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

@Entity('bills')
export class Bill {
    @PrimaryGeneratedColumn('uuid') 
    billId!: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    staffId!: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    staffName!: string;
    
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    @IsNumber()
    @IsNotEmpty()
    TotalPrice!: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    ProductName!: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    ProductId!: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    quantity!: number;
}