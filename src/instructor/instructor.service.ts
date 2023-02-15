import { Injectable } from '@nestjs/common';
import { Instructor, Learner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateInstructorDto from './dto/create-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prismaService: PrismaService) {}

  async findOne(instructorId: string) {
    return this.prismaService.instructor.findFirst({
      where: {
        id: instructorId,
      },
    });
  }

  async create({
    User: { Profile, Phone, ...User },
  }: CreateInstructorDto): Promise<Instructor> {
    return this.prismaService.instructor.create({
      data: {
        User: {
          create: {
            ...User,
            Profile: {
              create: {
                ...Profile,
                Phone: {
                  create: {
                    ...Phone,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getLearners(instructorId: string): Promise<Learner[]> {
    return this.prismaService.learner.findMany({
      where: {
        instructorId: instructorId,
      },
    });
  }
}
