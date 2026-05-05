import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

class Bill
{
    @IsString()
    @IsOptional()
    StaffId?: string;

    @IsString()
    @IsOptional()
    staffName?: string;

    @IsNumber()
    TotalPrice!: number;

    @IsString()
    @IsNotEmpty()
    ProductName!: string;

    @IsString()
    @IsNotEmpty()
    ProductId!: string;

    @IsInt()
    @IsNotEmpty()
    quantity!: number;
}