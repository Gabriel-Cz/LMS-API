import { ApiProperty } from '@nestjs/swagger';
import { Instructor } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up-auth.dto';

export default class CreateInstructorDto
  implements Omit<Instructor, 'id' | 'userId' | 'instructorId'>
{
  @ApiProperty()
  @Type(() => SignUpDto)
  @IsNotEmpty()
  User: SignUpDto;
}
