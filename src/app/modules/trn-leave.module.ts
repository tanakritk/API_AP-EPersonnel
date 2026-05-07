import { forwardRef, Module } from '@nestjs/common';
import { LeaveController } from '../controllers/trn-leave.controller';
import { LeaveService } from '../services/trn-leave.service';
import { Leave } from 'src/database/entities/trn-leave.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRepo } from '../repositories/trn-leave.repo';
import { LeaveApproveModule } from './trn-leave-approve.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leave]),
    forwardRef(() => LeaveApproveModule),
  ],
  controllers: [LeaveController],
  providers: [LeaveService, LeaveRepo],
  exports: [LeaveService, LeaveRepo],
})
export class LeaveModule {}
