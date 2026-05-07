import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Education } from "src/database/entities/trn-education.entity";
import { EducationController } from "../controllers/trn-education.controller";
import { EducationService } from "../services/trn-education.service";
import { EducationRepo } from "../repositories/trn-education.repo";

@Module({
    imports: [TypeOrmModule.forFeature([Education])],
    controllers: [EducationController],
    providers: [EducationService, EducationRepo],
    exports: [EducationService, EducationRepo]

})

export class EducationModule {}