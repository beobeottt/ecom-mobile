import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import{Type} from 'class-transformer';
import { ShippingAddressDto } from './shippingAddress.dto';
import { Gender } from 'src/common/enums/gender.enum';
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    fullname!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    shippingAddress?:string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ShippingAddressDto)
    shippingAddresses?: ShippingAddressDto[];

  @IsOptional()
  @IsNumber()
  point?: number = 0;

  @IsOptional()
  @IsIn(['Male', 'FeMale'])
  gender?: Gender;

}

export class UpdateUserDto extends CreateUserDto{}