import { Injectable } from '@nestjs/common';
import { MasterUserRepo } from '../repositories/mas-user.repo';
import { MasterStatusLeaveRepo } from '../repositories/mas-status-leave.repo';
import { LeaveTypeEnum } from '../enum/trn-leave.enum';

@Injectable()
export class DropdownService {
  constructor(
    private readonly masterRepo: MasterUserRepo,
    private readonly masterStatusLeaveRepo: MasterStatusLeaveRepo,
  ) {}

  async getUser() {
    const json = {
      where: {
        isActive: true,
      },
    };
    const result = await this.masterRepo.findCondition(json);
    return result.map((item) => {
      const title = item.title ? item.title : '';
      const firstname = item.firstname ? item.firstname : '';
      const surname = item.surname ? item.surname : '';
      return {
        label: `${title} ${firstname} ${surname}`,
        value: item.id,
      };
    });
  }

  async getStatusLeave() {
    const result = await this.masterStatusLeaveRepo.findCondition({});
    return result.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }

  async getLeaveType() {
    const enumLeaveType = LeaveTypeEnum;
    return Object.values(enumLeaveType).map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }
}
