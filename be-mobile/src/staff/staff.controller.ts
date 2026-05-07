import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService){

    }

    @Post()
    create(@Body() dto: CreateStaffDto)
    {
        return this.staffService.create(dto);
    }

    @Get()
    findAll()
    {
        return this.staffService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.staffService.findOne(id);
    }

    @Patch(':id')
    Update(@Param('id') id: string, @Body() dto: UpdateStaffDto)
    {
        return this.staffService.UpdateStaffInfo(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this.staffService.delete(id);
    }

}
