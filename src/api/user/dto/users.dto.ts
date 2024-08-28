import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';


export class SignUpDto {
  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  password: string;

  @ApiProperty({ default: '' })
  course: string;

  @ApiProperty({ default: '' })
  deviceId: string;
}

export class SignInDto {
  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  password: string;

  @ApiProperty({ default: '' })
  deviceId: string;
}