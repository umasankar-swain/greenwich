import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller({ path: 'sessions', version: '1' })
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Post()
  create(@Body() createLectureDto: CreateSessionDto) {
    try {
      return this.sessionsService.create(createLectureDto);
    } catch (error: any) {
      console.log(error)
    }
  }

  @Get(':studentId')
  getLecturesForStudent(@Param('studentId') studentId: string) {
    return this.sessionsService.getLecturesForStudent(studentId);
  }

  @Patch(':lectureId/attendance')
  markAttendance(@Param('lectureId') lectureId: string, @Body('studentId') studentId: string) {
    return this.sessionsService.markAttendance(lectureId, studentId);
  }
}
