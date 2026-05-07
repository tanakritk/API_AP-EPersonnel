import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { AcademicService } from "../services/trn-academic.service";
import { BaseSearchDto } from "../dto/base-search.dto";
import { PaginationVm } from "../view-model/pagination.vm";
import { CreateAcademicDto, UpdateAcademicDto } from "../dto/trn-academic.dto";
import { ResponseDataVm } from "../view-model/response-data.vm";

@Controller('academic')
export class AcademicController {
    constructor(
        private readonly academicService: AcademicService
    ){}

    @Post('search')
    async search( @Body() body: BaseSearchDto ){
        try{
            const result = await this.academicService.search(body)
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
    async create(@Body() body: CreateAcademicDto){
        try{
            const resule = await this.academicService.create(body)
            return ResponseDataVm.convertToVm(resule)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateAcademicDto){
        try{
            const result = await this.academicService.update(id, body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Delete('/:id')
    async delete( @Param('id') id: number ){
        try{
            const result = await this.academicService.delete(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }
}
