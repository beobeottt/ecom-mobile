import { Column } from 'typeorm';

export class ShippingAddress {
  @Column()
  id: string;

  @Column({ nullable: true })
  label?: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  addressLine: string;

  @Column({ nullable: true })
  ward?: string;

  @Column({ nullable: true })
  district?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ default: false })
  isDefault: boolean;
}