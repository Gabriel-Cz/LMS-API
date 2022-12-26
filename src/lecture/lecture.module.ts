import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LectureController],
  providers: [LectureService],
  imports: [PrismaModule],
})
export class LectureModule {}
