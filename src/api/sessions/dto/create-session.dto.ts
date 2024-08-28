import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'The Id of the lecture',
    example: 'COMP1001',
  })
  @IsNotEmpty()
  @IsString()
  moduleId: string;

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
    description: 'The name of the lecture',
    example: 'Networking Architecture',
  })
  @IsNotEmpty()
  @IsString()
  moduleName: string;

  @ApiProperty({
    description: 'The ID of the student',
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The start time of the lecture',
    example: '2024-08-28T09:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the lecture',
    example: '2024-08-28T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
