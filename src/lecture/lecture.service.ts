import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLectureDto: CreateLectureDto) {
    return this.prismaService.lecture.create({
      data: { ...createLectureDto },
    });
  }

  findAllForOne(personId: string) {
    return this.prismaService.lecture.findMany({
      OR: [{ learnerId: personId }, { instructorId: personId }],
    });
  }

  findOne(id: number) {
    return this.prismaService.lecture.findOne({
      where: { id },
    });
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return this.prismaService.lecture.findOne({
      where: { id },
      data: { ...updateLectureDto },
    });
  }

  remove(id: number) {
    return this.prismaService.lecture.delete({
      where: { id },
    });
  }
}
