import { ApiProperty } from "@nestjs/swagger";
import { Lecture, SubjectType } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLectureDto implements Omit<Lecture, 'id' | 'createdAt'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instructorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  learnerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: SubjectType;
}
