import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkAttendanceDto {
  @ApiProperty({
    description: 'The ID of the student marking attendance',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @ApiProperty({
    description: 'The latitude of the location where attendance is being marked',
    example: 37.7749,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the location where attendance is being marked',
    example: -122.4194,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: 'The place or name of the location where attendance is being marked',
    example: 'San Francisco, CA',
  })
  @IsNotEmpty()
  @IsString()
  place: string;
}
