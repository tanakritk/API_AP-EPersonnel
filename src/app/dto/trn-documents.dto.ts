import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDocumentsDto {
  @ApiProperty({
    description: 'ชื่อไฟล์',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}

export class UpdateDocumentsDto extends PartialType(CreateDocumentsDto) {}
