import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShippingAddress } from './shippingAddress.entity';
import { Gender } from 'src/common/enums/gender.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  shippingAddress?: string;

  @Column({ type: 'jsonb', default: [] })
  shippingAddresses: ShippingAddress[];

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ default: 0 })
  point: number;

  @Column({ default: 'USER' })
  role: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  googleId?: string;

  
  @Column({ type: 'int', array: true, default: [] })
  favourites: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}