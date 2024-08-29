import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkAttendanceDto {
  @ApiProperty({
    description: 'The ID of the Module',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  moduleId: string;

  @ApiProperty({
    description: 'The ID of the Student',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  studentId: string;
}
