import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { MarkAttendanceDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/session.entity';
import { Users } from '../user/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';

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

    const module = this.modulesRepository.create({
      moduleId,
      moduleName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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



  async markAttendance(markAttendanceDto: MarkAttendanceDto): Promise<boolean> {
    const { moduleId, studentId, latitude, longitude } = markAttendanceDto;

    const module = await this.modulesRepository.findOne({ where: { moduleId }, relations: ['user'] });
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const now = new Date(); 

    const startTimeUTC = module.startTime;
    const endTimeUTC = module.endTime;

    // if (now < startTimeUTC || now > endTimeUTC) {
    //   throw new BadRequestException('Attendance can only be marked during the module time');
    // }

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
