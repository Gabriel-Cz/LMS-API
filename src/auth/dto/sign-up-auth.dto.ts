import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import PhoneDto from 'src/user/dto/phone.dto';
import ProfileDto from 'src/user/dto/profile.dto';

export class SignUpDto implements Omit<User, 'id' | 'createdAt'> {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole | null;

  @ApiProperty()
  @Type(() => ProfileDto)
  @IsNotEmpty()
  Profile: ProfileDto;

  @ApiProperty()
  @Type(() => PhoneDto)
  @IsNotEmpty()
  Phone: PhoneDto;
}
