import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveCronService } from '../services/leave-cron.service';
import { MasterUser } from 'src/database/entities/mas-user.entity';
import { Attendance } from 'src/database/entities/trn-attendance.entity';
import { Leave } from 'src/database/entities/trn-leave.entity';
import { MasterUserRepo } from '../repositories/mas-user.repo';
import { AttendanceRepo } from '../repositories/trn-attendance.repo';
import { LeaveRepo } from '../repositories/trn-leave.repo';

@Module({
  imports: [TypeOrmModule.forFeature([MasterUser, Attendance, Leave])],
  providers: [LeaveCronService, MasterUserRepo, AttendanceRepo, LeaveRepo],
})
export class LeaveCronModule {}
