import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateLeaveApproveDto,
  UpdateLeaveApproveDto,
} from '../dto/trn-leave-approve.dto';
import { ResponseDataVm } from 'src/app/view-model/response-data.vm';
import { PaginationVm } from 'src/app/view-model/pagination.vm';
import { LeaveApproveService } from '../services/trn-leave-approve.service';
import { BaseSearchDto } from '../dto/base-search.dto';

@Controller('leave-approve')
export class LeaveApproveController {
  constructor(private leaveApproveService: LeaveApproveService) {}

  @Post('search')
  async search(@Body() body: BaseSearchDto) {
    try {
      const result = await this.leaveApproveService.search(body);
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
  async create(@Body() body: CreateLeaveApproveDto) {
    try {
      const result = await this.leaveApproveService.create(body);
      return ResponseDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // @Put('/:id')
  // async update(@Body() body: UpdateLeaveApproveDto, @Param('id') Id: number) {
  //   try {
  //     const result = await this.leaveApproveService.update(body, Id);
  //     return ResponseDataVm.convertToVm(result);
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  // @Delete('/:id')
  // async delete(@Param('id') id: number) {
  //   try {
  //     const result = await this.leaveApproveService.delete(id);
  //     return ResponseDataVm.convertToVm(result);
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }
}
