import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { CreateMasterUserDto, CreateRelationMasterUserDto, UpdateMasterUserDto, UpdatePasswordDto, UpdateRelationMasterUserDto } from "../dto/mas-user.dto";
import { ResponseDataVm } from "src/app/view-model/response-data.vm";
import { PaginationVm } from "src/app/view-model/pagination.vm";
import { MasterUserService } from "../services/mas-user.service";
import { BaseSearchDto } from "../dto/base-search.dto";
import { ResponseOriginalDataVm } from "../view-model/response-original-data.vm";

@Controller('master-user')
export class MasterUserController {
    constructor(
        private masterUserService: MasterUserService
    ){}

    @Post('search')
    async search( @Body() body: BaseSearchDto ){
        try{
            const result = await this.masterUserService.search(body)
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
    async create(@Body() body: CreateMasterUserDto){
        try{
            const result = await this.masterUserService.create(body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }


    @Put('/:id')
    async update( @Body() body: UpdateMasterUserDto, @Param('id') Id: number ){
        try{
            const result = await this.masterUserService.update(body, Id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }
    
    @Delete('/:id')
    async delete(@Param('id') id: number){
        try{
            const result = await this.masterUserService.delete(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    // ---------------------------------------------------------------------------- //

    @Put('reset-password/:id')
    async resetPassword(@Param('id') id: number){
        try{
            const result = await this.masterUserService.resetPassword(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('update-password/:id')
    async updatePassword(@Body() body: UpdatePasswordDto, @Param('id') id: number){
        try{
            const result = await this.masterUserService.updatePassword(body, id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Post('create-relation')
    async createRelation(@Body() body: CreateRelationMasterUserDto){
        try{
            const result = await this.masterUserService.createRelation(body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('update-relation/:id')
    async updateRelation(@Param('id') id: number, @Body() body: UpdateRelationMasterUserDto){
        try{
            const result = await this.masterUserService.updateRelation(id, body)
            return ResponseOriginalDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    

}