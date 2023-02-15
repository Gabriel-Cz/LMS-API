import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomLogger } from 'src/logger';
import Error from 'src/utils/dictionaries/error.dictionary';
import Success from 'src/utils/dictionaries/success.dictionary';
import { RoleInterceptor } from 'src/utils/interceptors/role-interceptor';
import CreateInstructorDto from './dto/create-instructor.dto';
import { InstructorService } from './instructor.service';

@ApiTags('Instructors')
@UseInterceptors(new RoleInterceptor(['ADMIN', 'INSTRUCTOR']))
@Controller('instructors')
export class InstructorController {
  private logger = new CustomLogger(InstructorController.name);

  constructor(private instructorService: InstructorService) {}

  @ApiResponse(Success.GET_LEARNERS)
  @ApiResponse(Error.GET_LEARNERS)
  @Get('/:instructorId')
  async findOne(
    @Res() res: Response,
    @Param('instructorId') instructorId: string,
  ): Promise<void> {
    try {
      const lecture = await this.instructorService.findOne(instructorId);
      res.status(Success.GET_LEARNERS.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res
        .status(Error.GET_LEARNERS.status)
        .send(Error.GET_LEARNERS.description);
    }
  }

  @ApiResponse(Success.GET_LEARNERS)
  @ApiResponse(Error.GET_LEARNERS)
  @Get('/:instructorId/learners')
  async findAllLearners(
    @Res() res: Response,
    @Param('instructorId') instructorId: string,
  ): Promise<void> {
    try {
      const lecture = await this.instructorService.getLearners(instructorId);
      res.status(Success.GET_LEARNERS.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res
        .status(Error.GET_LEARNERS.status)
        .send(Error.GET_LEARNERS.description);
    }
  }

  @ApiResponse(Success.CREATE_INSTRUCTOR)
  @ApiResponse(Error.CREATE_INSTRUCTOR)
  @Post()
  async create(
    @Res() res: Response,
    @Body() dto: CreateInstructorDto,
  ): Promise<void> {
    try {
      const lecture = await this.instructorService.create(dto);
      res.status(Success.CREATE_INSTRUCTOR.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res
        .status(Error.CREATE_INSTRUCTOR.status)
        .send(Error.CREATE_INSTRUCTOR.description);
    }
  }
}
