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
    const { name, password, course, deviceId } = signUpDto;

    // Validate or process input data if necessary
    if (!name || !password || !course || !deviceId) {
      throw new BadRequestException('All fields are required.');
    }

    // Hash the password using Argon2
    let hashedPassword: string;
    try {
      hashedPassword = await argon2.hash(password);
    } catch (error) {
      throw new BadRequestException('Password hashing failed.');
    }

    // Create a new user entity
    const user = new Users();
    user.name = name;
    user.password = hashedPassword;
    user.course = course;
    user.deviceId = deviceId;

    // Save the user to the database
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('User could not be created.');
    }
  }


  public async validate(signInDto: SignInDto): Promise<any> {
    const { name, password, deviceId } = signInDto;

    // Validate input data
    if (!name || !password) {
      throw new BadRequestException('Name and password are required.');
    }

    // Find the user by name
    const user = await this.usersRepository.findOne({ where: { name } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Verify the password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Check if the user is already logged in from another device
    if (user.deviceId && user.deviceId !== deviceId) {
      throw new UnauthorizedException('User is already logged in from another device.');
    }

    // Update the user's device ID
    user.deviceId = deviceId;
    await this.usersRepository.save(user);

    // Generate JWT token
    const payload = { username: user.name, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

}
