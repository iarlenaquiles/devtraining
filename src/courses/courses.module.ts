import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesController } from './courses.controller';
import { coursesProviers } from './courses.providers';
import { CoursesService } from './courses.service';
@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesProviers],
})
export class CoursesModule {}
