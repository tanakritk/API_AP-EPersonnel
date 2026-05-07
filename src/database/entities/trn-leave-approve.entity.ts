import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Leave } from './trn-leave.entity';
import { MasterStatusLeave } from './mas-status-leave.entity';
import { MasterUser } from './mas-user.entity';

@Entity({ name: 'trn_leaveapprove' })
export class LeaveApprove extends BaseEntity {
  @Column({ type: 'varchar', length: 1000 })
  note: string;

  // --------------------------------------------------------------------- //

  @ManyToOne(() => Leave, (leave) => leave.trn_leaveapprove)
  trn_leave: Leave;

  @ManyToOne(() => MasterStatusLeave, (sta) => sta.trn_leaveapprove)
  mas_statusleave: MasterStatusLeave;

  @ManyToOne(() => MasterUser, (user) => user.trn_leaveapprove)
  mas_user: MasterUser;
}
