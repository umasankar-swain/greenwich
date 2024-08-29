import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { MarkAttendanceDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/session.entity';
import { Users } from '../user/entities/user.entity';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class SessionsService {

  constructor(
    @InjectRepository(Modules) private modulesRepository: Repository<Modules>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) { }

  async create(createSessionDto: CreateSessionDto): Promise<Modules> {
    const { moduleId, moduleName, startTime, endTime, latitude, longitude, userId } = createSessionDto;

    const student = await this.usersRepository.findOne({ where: { studentId: userId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const timezone = 'America/New_York'; // Example: Eastern Time (ET)
    const startTimeUS = DateTime.fromISO(startTime, { zone: timezone }).toJSDate();
    const endTimeUS = DateTime.fromISO(endTime, { zone: timezone }).toJSDate();

    const module = this.modulesRepository.create({
      moduleId,
      moduleName,
      startTime: startTimeUS,
      endTime: endTimeUS,
      latitude,
      longitude,
      user: student,
    });

    return this.modulesRepository.save(module);
  }

  async getUpcomingModules(userId: string): Promise<Modules[]> {
    const student = await this.usersRepository.findOne({ where: { studentId: userId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const now = new Date();

    const res = await this.modulesRepository.find({
      where: {
        startTime: MoreThan(now),
        user: {
          id: student.id,
        },
      },
      order: {
        startTime: 'ASC',
      },
    });

    return res;
  }

  async getCurrentModule(userId: string): Promise<Modules | null> {
    // Fetch the student details using the userId
    const student = await this.usersRepository.findOne({ where: { studentId: userId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const now = new Date();

    const currentModule = await this.modulesRepository.findOne({
      where: {
        startTime: LessThanOrEqual(now),  
        endTime: MoreThan(now),         
        user: {
          id: student.id,
        },
      },
      order: {
        startTime: 'ASC',
      },
    });

    return currentModule;
  }


  async markAttendance(markAttendanceDto: MarkAttendanceDto): Promise<boolean> {
    const { moduleId, studentId, latitude, longitude } = markAttendanceDto;

    const module = await this.modulesRepository.findOne({ where: { moduleId }, relations: ['user'] });
    if (!module) {
      throw new NotFoundException('Module not found');
    }

  const now = new Date();

  // Check if the current time is within the module's start and end times
  if (now < new Date(module.startTime) || now > new Date(module.endTime)) {
    throw new BadRequestException('Attendance can only be marked during the module time');
  }

    if (module.user && module.user.studentId !== studentId) {
      throw new NotFoundException('User is not assigned to this module');
    }

    module.markedAttendance = true;
    module.latitude = latitude;
    module.longitude = longitude;
    await this.modulesRepository.save(module);

    return true;
  }

}
