import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { StatusEnum } from '../enum/attendance.enum';

export class CreateAttendanceDto {
  @ApiProperty({
    description: 'วันที่ลงเวลา',
    example: '2024-03-24',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  attendanceDate: string | Date;

  @ApiProperty({
    description: 'เวลาเข้างาน',
    example: '2024-03-24T08:30:00Z',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  checkInTime: string | Date;

  @ApiProperty({
    description: 'เวลาออกงาน',
    example: '2024-03-24T17:30:00Z',
    required: true,
  })
  @IsOptional()
  @IsDateString()
  checkOutTime: string | Date;

  @ApiProperty({
    description: 'สถานะ',
    example: 'ปกติ',
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {}
