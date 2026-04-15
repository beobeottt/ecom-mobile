import {
    IsString,
    IsNumber,
    IsInt,
    IsOptional,
    IsIn,
    IsArray,
    ValidateNested,
    Min,
    IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TypeProduct } from 'src/common/enums/product.enum';

class ProductVariantDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    label: string;

    @IsNumber()
    price: number;

    @IsInt()
    @IsOptional()
    quantity?: number;

    @IsOptional()
    @IsString()
    sku?: string;

    @IsOptional()
    @IsString()
    image: string;
}

export class CreateProductDto {
    @IsString()
    productName: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    brand: string;

    @IsInt()
    quantity: number;

    @IsOptional()
    @IsIn([TypeProduct])
    typeProduct?: TypeProduct;

    @IsOptional()
    @IsString()
    imgUrl?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    variants?: ProductVariantDto[];

}

export class UpdateProductDto extends CreateProductDto { }

export class FilterProductDto {
    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsString()
    brand?: string;

    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? undefined : Number(value))
    @IsNumber()
    @Min(0)
    priceMin?: number;


    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? undefined : Number(value))
    @IsNumber()

    priceMax?: number;

    @IsOptional()
    @IsEnum([TypeProduct])
    typeProduct?: TypeProduct;

    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? undefined : Number(value))
    @IsNumber()
    @Min(0)
    minQuantity?: number;

    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? undefined : Number(value))
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? 1 : Number(value))
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? 10 : Number(value))
    @IsNumber()
    @Min(1)
    limit?: number = 10;



}
