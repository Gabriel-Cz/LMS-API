import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto implements Omit<User, 'id' | 'createdAt'> {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole | null;
}
