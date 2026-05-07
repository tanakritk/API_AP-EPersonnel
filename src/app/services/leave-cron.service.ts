import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MasterUserRepo } from '../repositories/mas-user.repo';
import { AttendanceRepo } from '../repositories/trn-attendance.repo';
import { LeaveRepo } from '../repositories/trn-leave.repo';
import { StatusEnum } from '../enum/attendance.enum';
import * as dayjs from 'dayjs';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class LeaveCronService {
  private readonly logger = new Logger(LeaveCronService.name);

  constructor(
    private readonly masterUserRepo: MasterUserRepo,
    private readonly attendanceRepo: AttendanceRepo,
    private readonly leaveRepo: LeaveRepo,
  ) {}

  @Cron('0 1 * * *')
  async handleLeaveCron() {
    this.logger.debug('Running Leave Cron Job...');

    // Check for yesterday
    const targetDateStr = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const targetDateStart = dayjs(targetDateStr).startOf('day').toDate();
    const targetDateEnd = dayjs(targetDateStr).endOf('day').toDate();

    try {
      const activeUsers = await this.masterUserRepo.findCondition({
        where: { isActive: true },
      });

      for (const user of activeUsers) {
        // loop user ทั้งหมด
        // 1. Check if user already has an attendance record for the target date
        const attendanceRecords = await this.attendanceRepo.findCondition({
          // เช็คว่ามีการลงชื่อในวันนี้ไหม
          where: {
            mas_user: { id: user.id },
            attendanceDate: targetDateStr,
          },
        });

        const existingRecord =
          attendanceRecords && attendanceRecords.length > 0
            ? attendanceRecords[0]
            : null;

        // ถ้ามีการลงเวลาครบทั้งเข้าและออก ให้ข้ามไป
        if (
          existingRecord &&
          existingRecord.checkInTime &&
          existingRecord.checkOutTime
        ) {
          continue;
        }

        // 2. Check if user has an approved leave covering the target date
        const leaves = await this.leaveRepo.findCondition({
          // เช็คว่ามีการลาภายในวันนี้ไหม
          where: {
            mas_user: { id: user.id },
            isFinish: true,
            startDate: LessThanOrEqual(targetDateEnd),
            endDate: MoreThanOrEqual(targetDateStart),
          },
        });

        if (leaves && leaves.length > 0) {
          // ถ้ามี record เดิมอยู่แล้วแต่ออกไม่ครบ ให้อัปเดต status เดิม
          // ถ้าไม่มี record เลย ให้สร้างใหม่ (checkInTime เริ่มต้น 08:00)
          const payload = existingRecord
            ? {
                ...existingRecord,
                status: StatusEnum.Leave,
              }
            : {
                attendanceDate: targetDateStr,
                status: StatusEnum.Leave,
                mas_user: user,
              };

          await this.attendanceRepo.save(payload);
          this.logger.debug(
            `Created/Updated Leave Attendance for user ID: ${user.id} on ${targetDateStr}`,
          );
        } else if (
          existingRecord &&
          existingRecord.checkInTime &&
          !existingRecord.checkOutTime
        ) {
          // ถ้ามีการลงเวลาเข้า เเต่ไม่มีการลงเวลาออก เเล้วไม่มีการลา ให้ลงเป็น "ลืมสแกนออก"
          existingRecord.status = StatusEnum.Forgot;
          await this.attendanceRepo.save(existingRecord);
          this.logger.debug(
            `Updated Attendance to Forgot for user ID: ${user.id} on ${targetDateStr}`,
          );
        } else if (!existingRecord) {
          // ถ้าหากไม่มีการเข้างานเลย (ไม่มี record) เเล้วไม่มีการลา ให้ลงว่า "ขาด"
          const payload = {
            attendanceDate: targetDateStr,
            status: StatusEnum.Absent,
            mas_user: user,
          };

          await this.attendanceRepo.save(payload);
          this.logger.debug(
            `Created Attendance Absent for user ID: ${user.id} on ${targetDateStr}`,
          );
        }
      }
      this.logger.debug('Leave Cron Job completed successfully.');
    } catch (error) {
      this.logger.error('Error running Leave Cron Job', error.stack);
    }
  }
}
