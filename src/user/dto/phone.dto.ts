import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Phone, Phonetype } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class PhoneDto
  implements Omit<Phone, 'id' | 'profileId' | 'createdAt'>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @IsEnum(Phonetype)
  @IsNotEmpty()
  phoneType: Phonetype;
}
