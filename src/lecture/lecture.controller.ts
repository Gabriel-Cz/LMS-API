import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Response } from 'express';
import { Success } from 'src/utils/dictionaries';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    try {
      const lecture = this.lectureService.create(createLectureDto);
      res.status(Success.GET_LECTURE.status).send(lecture);
    } catch (error) {
      res.status(Success.CREATE_LECTURE.status).send(Error.);
    }
  }

  @Get()
  findAll() {
    return this.lectureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lectureService.update(+id, updateLectureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureService.remove(+id);
  }
}
