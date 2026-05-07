import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLeaveApproveDto {
  @ApiProperty({ description: 'บันทึกเพิ่มเติม' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'รหัสการลา' })
  @IsNotEmpty()
  @IsNumber()
  leaveId: number;

  @ApiProperty({ description: 'รหัสสถานะการลา' })
  @IsNotEmpty()
  @IsNumber()
  statusLeaveId: number;

  @ApiProperty({ description: 'รหัสผู้ใช้' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateLeaveApproveDto extends PartialType(CreateLeaveApproveDto) {}
