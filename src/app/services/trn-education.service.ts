import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EducationRepo } from "../repositories/trn-education.repo";
import { BaseSearchDto } from "../dto/base-search.dto";
import { CreateEducationDto, UpdateEducationDto } from "../dto/trn-education.dto";

@Injectable()
export class EducationService {
    constructor(
        private readonly educationRepo: EducationRepo
    ){}

    async search(body: BaseSearchDto){
        return await this.educationRepo.findData(body)
    }

    async create(body: CreateEducationDto){
        const { userId, ...newData } = body
        const modelSave = {
            ...newData,
            mas_user: {id: userId}
        }
        return await this.educationRepo.save(modelSave)
    }

    async update(id: number, body: UpdateEducationDto){
        const check = await this.educationRepo.getItemById(id)
        if( !check ){
            throw new InternalServerErrorException('data not found')
        }

        Object.assign(check, body)
        return await this.educationRepo.save(check)
    }

    async delete(id: number){
        const check = await this.educationRepo.getItemById(id)
        if( !check ){
            throw new InternalServerErrorException('data not found')
        }

        return await this.educationRepo.softDelete(id)
    }
}