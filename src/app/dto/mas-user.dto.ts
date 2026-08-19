import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { RoleEnum, SexEnum } from '../enum/mas-user.enum';

export class CreateMasterUserDto {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'xxxxxx123456' })
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  idCardNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ethnicity?: string;

  @ApiProperty({ required: false, example: '1990-01-01' })
  @IsOptional()
  @ValidateIf((o) => o.birthday !== '' && o.birthday !== null)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsDateString() // ใช้ตรวจสอบรูปแบบวันที่ YYYY-MM-DD
  birthday?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  statusUser?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  statusWork?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  professionalLicenseNo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  administratorLicenseNo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  supervisorLicenseNo?: string;

  @ApiProperty({ required: false, example: '2025-12-31' })
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.professionalLicenseEndDate !== '' &&
      o.professionalLicenseEndDate !== null,
  )
  @Transform(({ value }) => (value === '' ? null : value))
  @IsDateString()
  professionalLicenseEndDate?: string;

  @ApiProperty({ required: false, example: '2025-12-31' })
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.professionalLicenseEndDate !== '' &&
      o.professionalLicenseEndDate !== null,
  )
  @Transform(({ value }) => (value === '' ? null : value))
  @IsDateString()
  administratorLicenseEndDate?: string;

  @ApiProperty({ required: false, example: '2025-12-31' })
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.professionalLicenseEndDate !== '' &&
      o.professionalLicenseEndDate !== null,
  )
  @Transform(({ value }) => (value === '' ? null : value))
  @IsDateString()
  supervisorLicenseEndDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  yearService?: string;

  @ApiProperty({ required: false, example: '2020-01-01' })
  @IsOptional()
  @ValidateIf((o) => o.yearServiceStartDate !== '' && o.yearServiceStartDate !== null)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsDateString()
  yearServiceStartDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subjects?: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  isRefactorPassword?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  class?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subjectGroupLeader?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  headWorkDepartment?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deputyDirector?: string;

  @ApiProperty({ required: false, enum: RoleEnum })
  @IsOptional()
  @IsEnum(RoleEnum) // หรือ @IsString() ตามประเภทข้อมูลของคุณ
  role?: RoleEnum;

  @ApiProperty({ required: false, enum: SexEnum })
  @IsOptional()
  @IsEnum(SexEnum)
  sex?: SexEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  academicStanding?: string;
}

export class UpdateMasterUserDto extends PartialType(CreateMasterUserDto) {}

export class UpdatePasswordDto {
  @ApiProperty({ example: 'xxxxxx123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

// -------------------------------------------------------------------------------- //

class MateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false, example: 'นาง' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: 'สมหญิง' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstname?: string;

  @ApiProperty({ required: false, example: 'รักดี' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  surname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  address?: string;

  @ApiProperty({ required: false, example: '1234567890123' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  idCardNumber?: string;

  @ApiProperty({ required: false, example: '0812345678' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  phone?: string;

  @ApiProperty({ required: false, example: 'ไทย' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ required: false, example: 'ไทย' })
  @IsOptional()
  @IsString()
  ethnicity?: string;
}

class ChildDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false, example: 'เด็กชาย' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: 'เก่งกาจ' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstname?: string;

  @ApiProperty({ required: false, example: 'รักดี' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  surname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  idCardNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ethnicity?: string;
}

export class CreateRelationMasterUserDto extends PartialType(
  CreateMasterUserDto,
) {
  @ApiProperty({ type: () => MateDto })
  @IsOptional()
  mate?: MateDto;

  @ApiProperty({ type: () => [ChildDto] })
  @IsOptional()
  @IsArray()
  child?: ChildDto[];
}

export class UpdateRelationMasterUserDto extends PartialType(
  CreateMasterUserDto,
) {
  @ApiProperty({ type: () => MateDto })
  @IsOptional()
  @ValidateNested() // เพิ่มอันนี้เพื่อให้ตรวจเข้าไปถึงข้างใน object
  @Type(() => MateDto) // ต้องใช้ class-transformer ช่วย
  mate?: MateDto;

  @ApiProperty({ type: () => [ChildDto] })
  @IsOptional()
  @ValidateNested({ each: true }) // เพิ่มอันนี้เพื่อให้ตรวจเข้าไปถึงข้างใน object
  @Type(() => ChildDto) // ต้องใช้ class-transformer ช่วย
  @IsArray()
  child?: ChildDto[];
}
