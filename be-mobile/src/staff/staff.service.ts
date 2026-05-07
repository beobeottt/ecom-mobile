import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entity/staff.entity';
import { Repository } from 'typeorm';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private readonly staffRepo: Repository<Staff>,
    ){}

    async create(
        dto: CreateStaffDto
    ): Promise<Staff>
    {
        const exists = await this.staffRepo.findOne(
            {
                where: {StaffName: dto.StaffName},
            }
        );

        if(exists) return exists;

        const newStaff = this.staffRepo.create(dto);
        return this.staffRepo.save(newStaff);
    }

    async findAll(): Promise<Staff[]>
    {
        return this.staffRepo.find(
            {
                order: {StaffName: 'DESC'},
            });
    }

    async findOne(StaffId: string): Promise<Staff>
    {
        const staff = await this.findOne(StaffId);
        if(!staff)
        {
            throw new NotFoundException(`Staff ${StaffId} not found`)
        }
        return staff;
    }

    async UpdateStaffInfo(
        StaffId: string,
        dto: UpdateStaffDto
    ): Promise<Staff>
    {
        const staff = await this.findOne(StaffId);

        if(!staff)
        {
            throw new NotFoundException(`this Staff is not exist`)
        }

        Object.assign(StaffId, dto);

        return this.staffRepo.save(staff);
    }

    async delete(StaffId: string): Promise<void>
    {
        const staff = await this.findOne(StaffId)

        await this.staffRepo.remove(staff);
    }
}
