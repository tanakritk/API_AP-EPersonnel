import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({
    description: 'ระดับการศึกษา (เช่น ปริญญาตรี, มัธยมปลาย)',
    example: 'ปริญญาตรี',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  level?: string;

  @ApiProperty({
    description: 'ชื่อสถานศึกษาหรือสถานที่ตั้ง',
    example: 'มหาวิทยาลัยเกษตรศาสตร์',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  location?: string;

  @ApiProperty({
    description: 'คณะ หรือ สาขาวิชา',
    example: 'วิศวกรรมคอมพิวเตอร์',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  branch?: string;

  @ApiProperty({
    description: 'ปีที่จบการศึกษา (ค.ศ.)',
    example: '2566',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  endYear?: string;

  @ApiProperty({
    description: 'เกรดเฉลี่ยสะสม (GPA)',
    example: '3.50',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  grage?: string; // สะกดตาม Entity ของคุณ (ถ้าจะแก้เป็น grade อย่าลืมแก้ที่ Entity ด้วยนะครับ)

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}


export class UpdateEducationDto extends PartialType(CreateEducationDto) {}