import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';


export class SignUpDto {
  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  studentId: string;

  @ApiProperty({ default: '' })
  password: string;

  @ApiProperty({ default: '' })
  course: string;
}

export class SignInDto {
  @ApiProperty({ default: '' })
  studentId: string;

  @ApiProperty({ default: '' })
  password: string;

  @ApiProperty({ default: '' })
  deviceId: string;
}