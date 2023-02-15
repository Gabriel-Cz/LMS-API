import { ApiPropertyOptional } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export default class ProfileDto
  implements Omit<Profile, 'id' | 'userId' | 'createdAt'>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  second_name: string;
}
