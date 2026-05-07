import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documents } from "src/database/entities/trn-documents.entity";
import { DocumentsController } from "../controllers/trn-documents.controller";
import { DocumentsService } from "../services/trn-documents.service";
import { DocumentsRepo } from "../repositories/trn-documents.repo";
import { FilesModule } from "./files.module";

@Module({
    imports: [
                TypeOrmModule.forFeature([Documents]),
                forwardRef(() => FilesModule)
            ],
    controllers: [DocumentsController],
    providers: [DocumentsService, DocumentsRepo],
    exports: [DocumentsService, DocumentsRepo]
})

export class DocumentsModule{}