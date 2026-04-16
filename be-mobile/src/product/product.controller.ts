import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {

    }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    Update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productService.UpdateProduct(id, dto);
    }
    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this.productService.delete(id);
    }


}
