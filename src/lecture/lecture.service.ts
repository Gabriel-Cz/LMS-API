import { Injectable } from '@nestjs/common';
import { Lecture } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    return this.prismaService.lecture.create({
      data: { ...createLectureDto }
    });
  }

  async findAll(): Promise<Lecture[]> {
    return this.prismaService.lecture.findMany({});
  }

  async findOne(id: string): Promise<Lecture> {
    return this.prismaService.lecture.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: string, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
    return this.prismaService.lecture.update({
      where: {
        id: id
      },
      data: { ...updateLectureDto }
    });
  }

  async remove(id: string): Promise<Lecture> {
    return this.prismaService.lecture.delete({
      where: {
        id: id
      }
    });
  }
}
