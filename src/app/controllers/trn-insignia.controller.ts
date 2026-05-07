import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { InsigniaService } from "../services/trn-insignia.service";
import { BaseSearchDto } from "../dto/base-search.dto";
import { PaginationVm } from "../view-model/pagination.vm";
import { CreateInsigniaDto, UpdateInsigniaDto } from "../dto/trn-insignia.dto";
import { ResponseDataVm } from "../view-model/response-data.vm";

@Controller('insignia')
export class InsigniaController {
    constructor(
        private readonly insigniaService: InsigniaService
    ){}

    @Post('search')
    async search( @Body() body: BaseSearchDto ){
        try{
            const result = await this.insigniaService.search(body)
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
    async create(@Body() body: CreateInsigniaDto){
        try{
            const resule = await this.insigniaService.create(body)
            return ResponseDataVm.convertToVm(resule)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateInsigniaDto){
        try{
            const result = await this.insigniaService.update(id, body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Delete('/:id')
    async delete( @Param('id') id: number ){
        try{
            const result = await this.insigniaService.delete(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }
}
