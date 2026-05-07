import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { LeaveFormatEnum, LeaveTypeEnum } from '../enum/trn-leave.enum';

export class CreateLeaveDto {
  @ApiProperty({ enum: LeaveTypeEnum, description: 'ประเภทการลา' })
  @IsNotEmpty()
  @IsEnum(LeaveTypeEnum)
  leaveType: LeaveTypeEnum;

  @ApiProperty({ enum: LeaveFormatEnum, description: 'รูปแบบการลา' })
  @IsNotEmpty()
  @IsEnum(LeaveFormatEnum)
  leaveFormat: LeaveFormatEnum;

  @ApiProperty({ description: 'เหตุผลการลา' })
  @IsNotEmpty()
  @IsString()
  reasonLeave: string;

  @ApiProperty({ description: 'วันที่เริ่มลา' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'วันที่สิ้นสุดการลา' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'รหัสผู้ใช้งานที่ลา' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'รหัสสถานะการลา' })
  @IsOptional()
  @IsNumber()
  statusLeaveId?: number;

  @ApiProperty({ description: 'การเสร็จสิ้นการลา' })
  @IsOptional()
  @IsBoolean()
  isFinish?: boolean;
}

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {
  @ApiProperty({ description: 'การอนุมัติโดยหัวหน้างาน', required: false })
  @IsOptional()
  leaderApprove?: boolean;

  @ApiProperty({ description: 'เหตุผลโดยหัวหน้างาน', required: false })
  @IsOptional()
  @IsString()
  leaderReason?: string;

  @ApiProperty({ description: 'การอนุมัติโดยผู้อำนวยการ', required: false })
  @IsOptional()
  headerApprove?: boolean;

  @ApiProperty({ description: 'เหตุผลโดยผู้อำนวยการ', required: false })
  @IsOptional()
  @IsString()
  headerReason?: string;

  @ApiProperty({
    description: 'การอนุมัติโดยผู้อำนวยการกอง/ฝ่าย',
    required: false,
  })
  @IsOptional()
  directorApprove?: boolean;

  @ApiProperty({ description: 'เหตุผลโดยผู้อำนวยการกอง/ฝ่าย', required: false })
  @IsOptional()
  @IsString()
  directorReason?: string;
}
