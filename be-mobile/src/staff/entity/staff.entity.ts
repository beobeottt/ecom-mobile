import { IsNotEmpty } from "class-validator";
import { position } from "src/common/enums/position.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('staffs')
export class Staff {
    @PrimaryGeneratedColumn('uuid')
    StaffId!: string;

    @Column()
    StaffName!: string;

    @Column()
    position!: position;

    @Column({default: 0})
    point!: number;

    @Column()
    avatarUrl?: string
}