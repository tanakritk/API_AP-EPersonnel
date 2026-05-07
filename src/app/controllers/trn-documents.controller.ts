import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { DocumentsService } from '../services/trn-documents.service';
import { BaseSearchDto } from '../dto/base-search.dto';
import {
  CreateDocumentsDto,
  UpdateDocumentsDto,
} from '../dto/trn-documents.dto';
import { PaginationVm } from '../view-model/pagination.vm';
import { ResponseDataVm } from '../view-model/response-data.vm';
import { ApiConsumes } from '@nestjs/swagger';
import { ResponseOriginalDataVm } from '../view-model/response-original-data.vm';

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('search')
  async search(@Body() body: BaseSearchDto) {
    try {
      const result = await this.documentsService.search(body);
      const pagination = {
        page: Number(body.page),
        limit: Number(body.limit),
        totalItems: Number(result.totalItem),
      };
      return PaginationVm.convertToVm(result.data, pagination);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('')
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFiles() files: any,
    @Body() body: CreateDocumentsDto,
    @Req() req: any,
  ) {
    try {
      const result = await this.documentsService.create(
        files,
        body,
        req?.user?.id,
      );
      return ResponseOriginalDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.documentsService.delete(id);
      return ResponseDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
