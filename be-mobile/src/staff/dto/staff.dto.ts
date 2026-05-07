import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { position } from "src/common/enums/position.enum";

export class CreateStaffDto
{
    @IsString()
    @IsNotEmpty()
    StaffName!: string;

    @IsNotEmpty()
    position!: position;

    @IsNumber()
    point!: number;

    @IsString()
    @IsOptional()
    avatarUrl?: string;
}

export class UpdateStaffDto extends CreateStaffDto{}