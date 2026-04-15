import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ShippingAddress } from './entities/shippingAddress.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(
    dto: CreateUserDto ,
  ): Promise<User> {
    const exists = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (exists) return exists;

    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async toggleFavourite(userId: string, productId: number) {
    const user = await this.findOne(userId);

    const index = user.favourites.findIndex(id => id === productId);

    if (index > -1) {
      user.favourites.splice(index, 1);
    } else {
      user.favourites.push(productId);
    }

    return this.userRepo.save(user);
  }

  async getFavourites(userId: string): Promise<number[]> {
    const user = await this.findOne(userId);
    return user.favourites;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  async getShippingAddresses(userId: string) {
    const user = await this.findOne(userId);
    return user.shippingAddresses || [];
  }

  async addShippingAddress(userId: string, dto: ShippingAddress) {
    const user = await this.findOne(userId);

    const addresses = user.shippingAddresses ?? [];

    const newAddress: ShippingAddress = {
      ...dto,
      id: dto.id || Date.now().toString(),
      isDefault: dto.isDefault ?? addresses.length === 0,
    };

    if (newAddress.isDefault) {
      addresses.forEach(a => (a.isDefault = false));
    }

    addresses.push(newAddress);
    user.shippingAddresses = addresses;

    return this.userRepo.save(user);
  }

  async updateShippingAddress(
    userId: string,
    addressId: string,
    dto: Partial<ShippingAddress>,
  ) {
    const user = await this.findOne(userId);

    const addresses = user.shippingAddresses ?? [];
    const index = addresses.findIndex(a => a.id === addressId);

    if (index === -1) {
      throw new NotFoundException('Address not found');
    }

    if (dto.isDefault) {
      addresses.forEach(a => (a.isDefault = false));
    }

    addresses[index] = {
      ...addresses[index],
      ...dto,
    };

    user.shippingAddresses = addresses;
    return this.userRepo.save(user);
  }

  async removeShippingAddress(userId: string, addressId: string) {
    const user = await this.findOne(userId);

    let addresses = user.shippingAddresses ?? [];

    const removed = addresses.find(a => a.id === addressId);
    if (!removed) {
      throw new NotFoundException('Address not found');
    }

    addresses = addresses.filter(a => a.id !== addressId);

    if (removed.isDefault && addresses.length > 0) {
      addresses[0].isDefault = true;
    }

    user.shippingAddresses = addresses;
    return this.userRepo.save(user);
  }

  async setDefaultShippingAddress(userId: string, addressId: string) {
    const user = await this.findOne(userId);

    const addresses = user.shippingAddresses ?? [];
    const exists = addresses.find(a => a.id === addressId);

    if (!exists) {
      throw new NotFoundException('Address not found');
    }

    addresses.forEach(a => {
      a.isDefault = a.id === addressId;
    });

    user.shippingAddresses = addresses;
    return this.userRepo.save(user);
  }
}