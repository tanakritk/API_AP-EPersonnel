import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class CreateAcademicDto {
  @ApiProperty({
    description: 'ชื่อ',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  name?: string;

  @ApiProperty({
    description: 'วันที่รับ',
    required: false,
  })
  @IsOptional()
  @IsString()
  receiptDate?: string;

  @ApiProperty({
    description: 'วันที่ส่ง',
    required: false,
  })
  @IsOptional()
  @IsString()
  dueDate?: string;

  @ApiProperty({
    description: 'หมายเหตุ',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  note?: string;

  @ApiProperty({
    description: 'ใช้งาน',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateAcademicDto extends PartialType(CreateAcademicDto) {}
