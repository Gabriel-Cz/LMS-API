import { Injectable } from '@nestjs/common';
import { Learner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateLearnerDto from './dto/create-learner.dto';

@Injectable()
export class LearnerService {
  constructor(private prismaService: PrismaService) {}

  async create({
    User: { Phone, Profile, ...dto },
  }: CreateLearnerDto): Promise<Learner> {
    return this.prismaService.learner.create({
      data: {
        User: {
          create: {
            ...dto,
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
}
