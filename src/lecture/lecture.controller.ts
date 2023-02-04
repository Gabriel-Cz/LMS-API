import { Controller, Get, Post, Res, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { CustomLogger } from 'src/logger';
import Success from 'src/utils/dictionaries/error.dictionary';
import Error from 'src/utils/dictionaries/error.dictionary';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@ApiTags('Lecture')
@UseGuards(LocalAuthGuard)
@Controller('lecture')
export class LectureController {
  private readonly logger = new CustomLogger(LectureController.name);

  constructor(private readonly lectureService: LectureService) { }

  @ApiResponse(Success.CREATE_LECTURE)
  @ApiResponse(Error.CREATE_LECTURE)
  @Post()
  async create(
    @Res() res: Response,
    @Body() dto: CreateLectureDto
  ): Promise<void> {
    try {
      const lecture = await this.lectureService.create(dto);
      res.status(Success.CREATE_LECTURE.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res.status(Error.CREATE_LECTURE.status).send(Error.CREATE_LECTURE.description);
    }
  }

  @ApiResponse(Success.GET_LECTURES)
  @ApiResponse(Error.GET_LECTURES)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const lectures = await this.lectureService.findAll();
      res.status(Success.GET_LECTURES.status).send(lectures);
    } catch (error) {
      this.logger.debug(error);
      res.status(Error.GET_LECTURES.status).send(Error.GET_LECTURES.description);
    }
  }

  @ApiResponse(Success.GET_LECTURE)
  @ApiResponse(Error.GET_LECTURE)
  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string
  ): Promise<void> {
    try {
      const lecture = await this.lectureService.findOne(id);
      res.status(Success.GET_LECTURE.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res.status(Error.GET_LECTURE.status).send(Error.GET_LECTURE.description);
    }
  }

  @ApiResponse(Success.UPDATE_LECTURE)
  @ApiResponse(Error.UPDATE_LECTURE)
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateLectureDto: UpdateLectureDto
  ): Promise<void> {
    try {
      const lecture = await this.lectureService.update(id, updateLectureDto);
      res.status(Success.UPDATE_LECTURE.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res.status(Error.UPDATE_LECTURE.status).send(Error.UPDATE_LECTURE.description);
    }
  }

  @ApiResponse(Success.DELETE_LECTURE)
  @ApiResponse(Error.DELETE_LECTURE)
  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string
  ): Promise<void> {
    try {
      const lecture = await this.lectureService.remove(id);
      res.status(Success.DELETE_LECTURE.status).send(lecture);
    } catch (error) {
      this.logger.debug(error);
      res.status(Error.DELETE_LECTURE.status).send(Error.DELETE_LECTURE.description);
    }
  }
}
