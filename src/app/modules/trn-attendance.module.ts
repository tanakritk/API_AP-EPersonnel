import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/database/entities/trn-attendance.entity';
import { AttendanceController } from '../controllers/trn-attendance.controller';
import { AttendanceService } from '../services/trn-attendance.service';
import { AttendanceRepo } from '../repositories/trn-attendance.repo';
import { SystemModule } from './system.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    forwardRef(() => SystemModule),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepo],
  exports: [AttendanceService, AttendanceRepo],
})
export class AttendanceModule {}
