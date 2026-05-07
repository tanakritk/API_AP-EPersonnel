import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentsRepo } from '../repositories/trn-documents.repo';
import { BaseSearchDto } from '../dto/base-search.dto';
import {
  CreateDocumentsDto,
  UpdateDocumentsDto,
} from '../dto/trn-documents.dto';
import { FilesService } from './files.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepo: DocumentsRepo,
    private readonly filesService: FilesService,
  ) {}

  async search(body: BaseSearchDto) {
    return await this.documentsRepo.findData(body);
  }

  async create(files: any, body: CreateDocumentsDto, userId: number) {
    let response = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file.originalname = decodeURIComponent(file.originalname);
      const extension = file?.originalname.split('.').pop();
      const modelSave = {
        mas_user: { id: userId },
        name: `${body.name}.${extension}`,
        typeFile: file.mimetype,
        originalName: file.originalname,
      };
      const resultSaveOneFile = await this.documentsRepo.save(modelSave);

      const path = `/files/documents/${resultSaveOneFile.id}.${extension}`;
      resultSaveOneFile.path = path;
      await this.filesService.uploadFile(file.path, path);
      const resultSaveTwoFile =
        await this.documentsRepo.save(resultSaveOneFile);
      response.push(resultSaveTwoFile);
    }

    return response;
  }

  async delete(id: number) {
    const check = await this.documentsRepo.getItemById(id);
    if (!check) {
      throw new InternalServerErrorException('data not found');
    }
    await this.filesService.deleteFile(check.path);
    return await this.documentsRepo.softDelete(id);
  }
}
