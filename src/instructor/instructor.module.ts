import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InstructorService, PrismaService],
  controllers: [InstructorController],
  exports: [InstructorService],
})
export class InstructorModule {}
