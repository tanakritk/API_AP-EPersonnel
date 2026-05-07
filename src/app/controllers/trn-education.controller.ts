import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { EducationService } from "../services/trn-education.service";
import { BaseSearchDto } from "../dto/base-search.dto";
import { PaginationVm } from "../view-model/pagination.vm";
import { CreateEducationDto, UpdateEducationDto } from "../dto/trn-education.dto";
import { ResponseDataVm } from "../view-model/response-data.vm";

@Controller('education')
export class EducationController {
    constructor(
        private readonly educationService: EducationService
    ){}

    @Post('search')
    async search( @Body() body: BaseSearchDto ){
        try{
            const result = await this.educationService.search(body)
            const pagination = {
                page: Number(body.page),
                limit: Number(body.limit),
                totalItems: Number(result.totalItem)
            }
            return PaginationVm.convertToVm(result.data, pagination)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        
        }
    }

    @Post('')
    async create(@Body() body: CreateEducationDto){
        try{
            const resule = await this.educationService.create(body)
            return ResponseDataVm.convertToVm(resule)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateEducationDto){
        try{
            const result = await this.educationService.update(id, body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Delete('/:id')
    async delete( @Param('id') id: number ){
        try{
            const result = await this.educationService.delete(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }


}