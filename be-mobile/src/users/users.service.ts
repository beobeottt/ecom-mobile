
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ShippingAddress } from './entities/shippingAddress.entity';
import { ShippingAddressDto } from './dto/shippingAddress.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {

        const exists = await this.userRepo.findOne({ where: { email: dto.email }, });

        if (exists) return exists;

        const user = this.userRepo.create(dto);

        return await this.userRepo.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepo.find(
            {
                order: { createdAt: 'DESC' },
            }
        );
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id }, });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email }, });

        if (!user) {
            throw new NotFoundException(`User with Email ${email} not found`);
        }
        return user;
    }

    //async toggleFavourite(id: string)

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
    }

    async getShippingAddresses(userId: string, dto: ShippingAddressDto) {
        const user = await this.findOne(userId);
        if (!user) {
            throw new NotFoundException('User can not find');
        }

        const add = user.shippingAddress ?? [];
        const newAdd = {
            id: dto.id,
            label: dto.label,
            fullName: dto.fullName,
            phone: dto.phone,
            addressLine: dto.addressLine,
            ward: dto.ward,
            district: dto.district,
            city: dto.city,
            note: dto.note,
            isDefault: dto.isDefault ?? add.length === 0,
        };
    }



}
