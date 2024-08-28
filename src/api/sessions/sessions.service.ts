import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { MarkAttendanceDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/session.entity';
import { Users } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {

  constructor(
    @InjectRepository(Lecture) private lecturesRepository: Repository<Lecture>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) { }

  async create(createSessionDto: CreateSessionDto): Promise<Lecture> {
    const { lectureName,lectureId, studentId, startTime, endTime } = createSessionDto;

    const student = await this.usersRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Create and save the lecture
    const lecture = this.lecturesRepository.create({
      lectureId,
      lectureName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      student, 
    });

    return this.lecturesRepository.save(lecture);
  }

  async getLecturesForStudent(studentId: string): Promise<Lecture[]> {
    return this.lecturesRepository.find({ where: { student: { id: studentId } } });
  }

  async markAttendance(
    lectureId: number,
    studentId: string,
    markAttendanceDto: MarkAttendanceDto,
  ): Promise<Lecture> {
    const { latitude, longitude, place } = markAttendanceDto;

    const lecture = await this.lecturesRepository.findOne({
      where: { id: lectureId, student: { id: studentId } },
    });

    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    lecture.markedAttendance = true;
    lecture.latitude = latitude;
    lecture.longitude = longitude;
    lecture.place = place;

    return this.lecturesRepository.save(lecture);
  }
}
