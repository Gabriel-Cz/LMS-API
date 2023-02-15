import { ApiPropertyOptional } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthUpdateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'lastLoggedIn'>
{
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole | null;
}
