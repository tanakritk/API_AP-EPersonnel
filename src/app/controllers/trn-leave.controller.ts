import { Body, Controller, Delete, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { CreateLeaveDto, UpdateLeaveDto } from '../dto/trn-leave.dto';
import { ResponseDataVm } from 'src/app/view-model/response-data.vm';
import { PaginationVm } from 'src/app/view-model/pagination.vm';
import { LeaveService } from '../services/trn-leave.service';
import { BaseSearchDto } from '../dto/base-search.dto';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post('search')
  async search(@Body() body: BaseSearchDto) {
    try {
      const result = await this.leaveService.search(body);
      const pagination = {
        page: Number(body.page),
        limit: Number(body.limit),
        totalItems: Number(result.totalItem),
      };
      return PaginationVm.convertToVm(result.data, pagination);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('')
  async create(@Body() body: CreateLeaveDto) {
    try {
      const result = await this.leaveService.create(body);
      return ResponseDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Put('/:id')
  async update(@Body() body: UpdateLeaveDto, @Param('id') Id: number) {
    try {
      const result = await this.leaveService.update(body, Id);
      return ResponseDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.leaveService.delete(id);
      return ResponseDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
