import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';
import { AuthModule } from './auth/auth.module';
import { LearnerModule } from './learner/learner.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    UserModule,
    LectureModule,
    AuthModule,
    LearnerModule,
    InstructorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
