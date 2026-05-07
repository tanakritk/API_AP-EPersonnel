import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterUserModule } from './mas-user.module';
import { DropdownController } from '../controllers/dropdown.controller';
import { DropdownService } from '../services/dropdown.service';
import { MasterStatusLeaveRepo } from '../repositories/mas-status-leave.repo';
import { MasterStatusLeave } from 'src/database/entities/mas-status-leave.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterStatusLeave]),
    forwardRef(() => MasterUserModule),
  ],
  controllers: [DropdownController],
  providers: [DropdownService, MasterStatusLeaveRepo],
  exports: [DropdownService],
})
export class DropdownModule {}
