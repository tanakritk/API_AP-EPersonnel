import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AttendanceRepo } from '../repositories/trn-attendance.repo';
import { BaseSearchDto } from '../dto/base-search.dto';
import {
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from '../dto/trn-attendance.dto';
import { SystemRepo } from '../repositories/system.repo';
import { StatusEnum } from '../enum/attendance.enum';
import * as dayjs from 'dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepo: AttendanceRepo,
    private readonly systemRepo: SystemRepo,
  ) {}

  async search(body: BaseSearchDto) {
    return await this.attendanceRepo.findData(body);
  }

  async create(body: CreateAttendanceDto) {
    const { userId, ...newData } = body;

    const system = await this.systemRepo.findCondition({});

    const timeStart = system.find((item) => item.id === 3);

    let status = StatusEnum.Normal;
    const checkIntimeStart = dayjs(newData.checkInTime).format('HH:mm');
    const systemTimeStart = timeStart.value.substring(0, 5);

    if (checkIntimeStart > systemTimeStart) {
      status = StatusEnum.Late;
    }

    const checkCondition = await this.attendanceRepo.findCondition({
      where: {
        attendanceDate: body.attendanceDate,
        mas_user: { id: userId },
      },
    });

    if (checkCondition && checkCondition.length > 0) {
      throw new InternalServerErrorException('มีข้อมูลการลงเวลาในวันนี้แล้ว');
    }

    const modelSave = {
      ...newData,
      status: status,
      mas_user: { id: userId },
    };
    return await this.attendanceRepo.save(modelSave);
  }

  async update(id: number, body: UpdateAttendanceDto) {
    const check = await this.attendanceRepo.getItemById(id);
    if (!check) {
      throw new InternalServerErrorException('data not found');
    }

    const system = await this.systemRepo.findCondition({});

    const timeEnd = system.find((item) => item.id === 4);

    let status = StatusEnum.Normal;
    const checkIntimeStart = dayjs(body.checkOutTime).format('HH:mm');
    const systemTimeEnd = timeEnd.value.substring(0, 5);

    if (checkIntimeStart < systemTimeEnd) {
      status = StatusEnum.Early;
    }

    const newBody = {
      ...body,
      status: status,
    };

    Object.assign(check, newBody);
    return await this.attendanceRepo.save(check);
  }

  async delete(id: number) {
    const check = await this.attendanceRepo.getItemById(id);
    if (!check) {
      throw new InternalServerErrorException('data not found');
    }

    return await this.attendanceRepo.softDelete(id);
  }
}
