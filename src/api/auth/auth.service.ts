import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto, SignUpDto } from '../user/dto/users.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) { }

  public async register(signUpDto: SignUpDto): Promise<Users> {
    const { name, password, course,studentId } = signUpDto;

    if (!name || !password || !course) {
      throw new BadRequestException('All fields are required.');
    }

    const user = new Users();
    user.name = name; 
    user.password = password;
    user.course = course;
    user.studentId = studentId;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('User could not be created.');
    }
  }



  public async validate(signInDto: SignInDto): Promise<any> {
    const { studentId, password } = signInDto;

    if (!studentId || !password) {
      throw new BadRequestException('Name and password are required.');
    }

    const user = await this.usersRepository.findOne({ where: { studentId } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { username: user.name, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, studentId: user.studentId };
  }


}
