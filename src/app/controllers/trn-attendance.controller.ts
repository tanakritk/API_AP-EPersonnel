import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { AttendanceService } from "../services/trn-attendance.service";
import { BaseSearchDto } from "../dto/base-search.dto";
import { PaginationVm } from "../view-model/pagination.vm";
import { CreateAttendanceDto, UpdateAttendanceDto } from "../dto/trn-attendance.dto";
import { ResponseDataVm } from "../view-model/response-data.vm";

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService
    ){}

    @Post('search')
    async search( @Body() body: BaseSearchDto ){
        try{
            const result = await this.attendanceService.search(body)
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
    async create(@Body() body: CreateAttendanceDto){
        try{
            const result = await this.attendanceService.create(body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: UpdateAttendanceDto){
        try{
            const result = await this.attendanceService.update(id, body)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }

    @Delete('/:id')
    async delete( @Param('id') id: number ){
        try{
            const result = await this.attendanceService.delete(id)
            return ResponseDataVm.convertToVm(result)
        }catch(err){
            throw new InternalServerErrorException(err.message)
        }
    }
}
