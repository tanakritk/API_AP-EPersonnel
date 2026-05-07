import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { DropdownService } from '../services/dropdown.service';
import { ResponseOriginalDataVm } from '../view-model/response-original-data.vm';

@Controller('dropdown')
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @Get('user')
  async getUser() {
    try {
      const result = await this.dropdownService.getUser();
      return ResponseOriginalDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('status-leave')
  async getStatusLeave() {
    try {
      const result = await this.dropdownService.getStatusLeave();
      return ResponseOriginalDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('leave-type')
  async getLeaveType() {
    try {
      const result = await this.dropdownService.getLeaveType();
      return ResponseOriginalDataVm.convertToVm(result);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
