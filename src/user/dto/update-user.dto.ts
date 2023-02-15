import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import ProfileDto from './profile.dto';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { User, UserRole } from '@prisma/client';
import PhoneDto from './phone.dto';

export class UpdateUserDto implements Partial<Omit<User, 'id' | 'createdAt'>> {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional()
  @Type(() => ProfileDto)
  @IsOptional()
  Profile?: ProfileDto;

  @ApiPropertyOptional()
  @Type(() => PhoneDto)
  @IsOptional()
  Phone?: PhoneDto;
}
