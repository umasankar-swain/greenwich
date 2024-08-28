import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsDate, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'The Id of the lecture',
    example: 'COMP1001',
  })
  @IsNotEmpty()
  @IsString()
  lectureName: string;

  @ApiProperty({
    description: 'The name of the lecture',
    example: 'Networking Architecture',
  })
  @IsNotEmpty()
  @IsString()
  lectureId: string;

  @ApiProperty({
    description: 'The ID of the student',
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  studentId: string;

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
