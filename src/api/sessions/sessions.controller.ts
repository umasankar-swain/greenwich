import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { MarkAttendanceDto } from './dto/update-session.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Modules')
@Controller({ path: 'modules', version: '1' })
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    try {
      const session = await this.sessionsService.create(createSessionDto);
      return session;
    } catch (error: any) {
      console.error(error);
      throw new HttpException('Failed to create session', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:studentId')
  async getUpcomingModules(@Param('studentId') studentId: string) {
    try {
      const modules = await this.sessionsService.getUpcomingModules(studentId);
      if (!modules.length) {
        throw new NotFoundException('No upcoming modules found for this student');
      }
      return modules;
    } catch (error: any) {
      console.error(error);
      throw new HttpException('Failed to fetch upcoming modules', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('currentModule/:studentId')
  async getCurrentModule(@Param('studentId') studentId: string) {
    try {

      const currentModule = await this.sessionsService.getCurrentModule(studentId);

      if (!currentModule) {
        throw new NotFoundException('No current module found for this student');
      }

      return currentModule;
    } catch (error: any) {
      console.error(error);
      throw new HttpException('Failed to fetch the current module', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Patch('attendance')
  async markAttendance(@Body() markAttendanceDto: MarkAttendanceDto) {
    try {
      const result = await this.sessionsService.markAttendance(markAttendanceDto);
      return { message: 'Attendance marked successfully' };
    } catch (error: any) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}
