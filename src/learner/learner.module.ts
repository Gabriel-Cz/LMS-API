import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LearnerService, PrismaService],
  controllers: [LearnerController],
  exports: [LearnerService],
})
export class LearnerModule {}
