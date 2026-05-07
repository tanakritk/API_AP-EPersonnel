import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLeaveDto, UpdateLeaveDto } from '../dto/trn-leave.dto';
import { LeaveRepo } from '../repositories/trn-leave.repo';
import { LeaveApproveRepo } from '../repositories/trn-leave-approve.repo';

@Injectable()
export class LeaveService {
  constructor(
    private leaveRepo: LeaveRepo,
    private leaveApproveRepo: LeaveApproveRepo,
  ) {}

  async search(body: any) {
    return await this.leaveRepo.findData(body);
  }

  async create(body: CreateLeaveDto) {
    const data = {
      ...body,
      mas_user: { id: body.userId },
      mas_statusleave: body.statusLeaveId ? { id: body.statusLeaveId } : null,
    };

    const result = await this.leaveRepo.save(data);
    const dataApprove = {
      trn_leave: { id: result.id },
      mas_statusleave: { id: body.statusLeaveId },
      mas_user: { id: body.userId },
      note: '-',
    };
    await this.leaveApproveRepo.save(dataApprove);
    return result;
  }

  async update(body: UpdateLeaveDto, Id: number) {
    const resultCheck = await this.leaveRepo.getItemById(Id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }

    // Convert userId to mas_user object if present
    if (body.userId) {
      (body as any).mas_user = { id: body.userId };
      delete body.userId;
    }

    // Convert statusLeaveId to mas_statusleave object if present
    if (body.statusLeaveId) {
      (body as any).mas_statusleave = { id: body.statusLeaveId };
      delete body.statusLeaveId;
    }

    Object.assign(resultCheck, body);
    return await this.leaveRepo.save(resultCheck);
  }

  async delete(id: number) {
    const resultCheck = await this.leaveRepo.getItemById(id);
    if (!resultCheck) {
      throw new InternalServerErrorException('Data not found');
    }
    return await this.leaveRepo.softDelete(id);
  }
}
