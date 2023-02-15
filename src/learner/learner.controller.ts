import { Get, Post, UseInterceptors } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { CustomLogger } from 'src/logger';
import Error from 'src/utils/dictionaries/error.dictionary';
import Success from 'src/utils/dictionaries/success.dictionary';
import { RoleInterceptor } from 'src/utils/interceptors/role-interceptor';
import CreateLearnerDto from './dto/create-learner.dto';
import { LearnerService } from './learner.service';

@Controller('learners')
export class LearnerController {
  private logger = new CustomLogger(LearnerController.name);

  constructor(private learnerService: LearnerService) {}

  @ApiResponse(Success.CREATE_LEARNER)
  @ApiResponse(Error.CREATE_LEARNER)
  @UseInterceptors(new RoleInterceptor(['ADMIN', 'INSTRUCTOR']))
  @Post()
  async create(
    @Res() res: Response,
    @Body() dto: CreateLearnerDto,
  ): Promise<void> {
    try {
      const lecture = await this.learnerService.create(dto);
      res.status(Success.CREATE_LEARNER.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res
        .status(Error.CREATE_LEARNER.status)
        .send(Error.CREATE_LEARNER.description);
    }
  }
}
