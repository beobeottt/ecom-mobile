import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ){}

    async create(
        dto: CreateProductDto
    ): Promise<Product>
    {
        const exists = await this.productRepo.findOne({
            where: {ProductName: dto.ProductName},
        });

        if(exists) return exists;

        const newProduct = this.productRepo.create(dto);
        return this.productRepo.save(newProduct);
    }

    async findAll(): Promise<Product[]>
    {
        return this.productRepo.find({
            order: { createdAt: 'DESC'},
        })
    }

    async findOne(productId: string): Promise<Product>
    {
        const product = await this.findOne(productId);
        if(!product)
        {
            throw new NotFoundException(`User ${productId} not found`);
        }

        return product;
    }

    async UpdateProduct(
        productId: string,
        dto: UpdateProductDto
    ): Promise<Product>
    {
        const product = await this.findOne(productId);

        if(!product)
        {
            throw new NotFoundException(`This is Product Dont Have or can found some thing about ID`);
        }
        Object.assign(productId, dto);
        return this.productRepo.save(product);
    }

    async delete(productId: string): Promise<void>
    {
        const product = await this.findOne(productId);
        await this.productRepo.remove(product)
    }

    
}
