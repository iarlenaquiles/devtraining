import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courserServices: CoursesService) {}

  @Get()
  findAll() {
    return this.courserServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courserServices.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    this.courserServices.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.courserServices.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courserServices.remove(id);
  }
}
