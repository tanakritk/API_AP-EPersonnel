import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Academic } from "src/database/entities/trn-academic.entity";
import { AcademicController } from "../controllers/trn-academic.controller";
import { AcademicService } from "../services/trn-academic.service";
import { AcademicRepo } from "../repositories/trn-academic.repo";

@Module({
    imports: [TypeOrmModule.forFeature([Academic])],
    controllers: [AcademicController],
    providers: [AcademicService, AcademicRepo],
    exports: [AcademicService, AcademicRepo]
})

export class AcademicModule {}
