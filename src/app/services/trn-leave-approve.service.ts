import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateLeaveApproveDto,
  UpdateLeaveApproveDto,
} from '../dto/trn-leave-approve.dto';
import { LeaveApproveRepo } from '../repositories/trn-leave-approve.repo';
import { LeaveRepo } from '../repositories/trn-leave.repo';

@Injectable()
export class LeaveApproveService {
  constructor(
    private leaveApproveRepo: LeaveApproveRepo,
    private leaveRepo: LeaveRepo,
  ) {}

  async search(body: any) {
    return await this.leaveApproveRepo.findData(body);
  }

  async create(body: CreateLeaveApproveDto) {
    const checkApprove = await this.leaveApproveRepo.findCondition({
      where: {
        trn_leave: { id: body.leaveId },
        mas_statusleave: { id: body.statusLeaveId },
        mas_user: { id: body.userId },
      },
    });

    if (checkApprove.length > 0) {
      throw new InternalServerErrorException('มีการอนุมัติโดยผู้ใช้นี้เเล้ว');
    }

    const arrayStatusFinish = [3, 5, 6, 7];
    const dataApprove = {
      ...body,
      trn_leave: { id: body.leaveId },
      mas_statusleave: { id: body.statusLeaveId },
      mas_user: { id: body.userId },
    };

    const leave = await this.leaveRepo.getItemById(body.leaveId);
    if (!leave) {
      throw new InternalServerErrorException('Data not found');
    }
    const dataLeave = {
      mas_statusleave: { id: body.statusLeaveId },
      isFinish: arrayStatusFinish.includes(body.statusLeaveId) ? true : false,
    };
    Object.assign(leave, dataLeave);
    await this.leaveRepo.save(leave);

    return await this.leaveApproveRepo.save(dataApprove);
  }

  // async update(body: UpdateLeaveApproveDto, Id: number) {
  //   const resultCheck = await this.leaveApproveRepo.getItemById(Id);
  //   if (!resultCheck) {
  //     throw new InternalServerErrorException('Data not found');
  //   }

  //   if (body.leaveId) {
  //     (body as any).leave = { id: body.leaveId };
  //     delete body.leaveId;
  //   }

  //   if (body.statusLeaveId) {
  //     (body as any).mas_statusleave = { id: body.statusLeaveId };
  //     delete body.statusLeaveId;
  //   }

  //   Object.assign(resultCheck, body);
  //   return await this.leaveApproveRepo.save(resultCheck);
  // }

  // async delete(id: number) {
  //   const resultCheck = await this.leaveApproveRepo.getItemById(id);
  //   if (!resultCheck) {
  //     throw new InternalServerErrorException('Data not found');
  //   }
  //   return await this.leaveApproveRepo.softDelete(id);
  // }
}
