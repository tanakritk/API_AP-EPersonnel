import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveApprove } from 'src/database/entities/trn-leave-approve.entity';
import { LeaveApproveController } from '../controllers/trn-leave-approve.controller';
import { LeaveApproveService } from '../services/trn-leave-approve.service';
import { LeaveApproveRepo } from '../repositories/trn-leave-approve.repo';
import { LeaveModule } from './trn-leave.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveApprove]),
    forwardRef(() => LeaveModule),
  ],
  controllers: [LeaveApproveController],
  providers: [LeaveApproveService, LeaveApproveRepo],
  exports: [LeaveApproveService, LeaveApproveRepo],
})
export class LeaveApproveModule {}
