import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Insignia } from "src/database/entities/trn-insignia.entity";
import { InsigniaController } from "../controllers/trn-insignia.controller";
import { InsigniaService } from "../services/trn-insignia.service";
import { InsigniaRepo } from "../repositories/trn-insignia.repo";

@Module({
    imports: [TypeOrmModule.forFeature([Insignia])],
    controllers: [InsigniaController],
    providers: [InsigniaService, InsigniaRepo],
    exports: [InsigniaService, InsigniaRepo]
})

export class InsigniaModule {}
