import { ApiProperty } from '@nestjs/swagger';
import { Learner } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up-auth.dto';

export default class CreateLearnerDto
  implements Omit<Learner, 'id' | 'userId' | 'instructorId'>
{
  @ApiProperty()
  @Type(() => SignUpDto)
  @IsNotEmpty()
  User: SignUpDto;
}
