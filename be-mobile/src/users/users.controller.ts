import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './users.service';
import { UpdateProductDto } from 'src/product/dto/product.dto';
import { ShippingAddress } from './entities/shippingAddress.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}
    @Post()
    create(@Body () dto: CreateUserDto)
    {
        return this.userService.create(dto);
    }

    @Get()
    findAll()
    {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.userService.findOne(id);
    }

    @Get('email/:email')
    findbyEmail(@Param('email') email: string)
    {
        return this.userService.findByEmail(email);
    }

    @Get(':id/shipping-address')
    getShippingAddress(@Param('id') id: string)
    {
        return this.userService.getShippingAddresses(id);
    }

    @Post(':id/shippinh-address')
    addShippingAddress(
        @Param('id') id: string,
        @Body() dto: ShippingAddress
    )
    {
        return this.userService.addShippingAddress(id, dto);
    }
    @Patch(':id/shipping-address')
    updateShippingAddress(
        @Param('id') id: string,
        @Param('addId') adId: string,
        @Body() dto: ShippingAddress
    )
    {
        return this.userService.updateShippingAddress(id,adId,dto);
    }

    @Delete(':id/shipping-address')
    removeShippingAddress(
        @Param('id') id: string,
        @Param('addId') adId: string,
    )
    {
        return this.userService.removeShippingAddress(id, adId);
    }

    @Get(':id/favourite')
    getFavourite(@Param('id') id: string)
    {
        return this.getFavourite(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    )
    {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this.userService.remove(id);
    }



    
}
