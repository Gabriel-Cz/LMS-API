import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: User['email'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
