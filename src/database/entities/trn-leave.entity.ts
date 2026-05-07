import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LeaveFormatEnum, LeaveTypeEnum } from 'src/app/enum/trn-leave.enum';
import { booleanTransformer } from 'src/helpers/function';
import { MasterStatusLeave } from './mas-status-leave.entity';
import { MasterUser } from './mas-user.entity';
import { LeaveApprove } from './trn-leave-approve.entity';

@Entity({ name: 'trn_leave' })
export class Leave extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  leaveType: LeaveTypeEnum;

  @Column({ type: 'varchar', length: 100, nullable: false })
  leaveFormat: LeaveFormatEnum;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  reasonLeave: string;

  @Column({ type: 'datetime', nullable: false })
  startDate: Date;

  @Column({ type: 'datetime', nullable: false })
  endDate: Date;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: null,
    transformer: booleanTransformer,
  })
  leaderApprove: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  leaderReason: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: null,
    transformer: booleanTransformer,
  })
  headerApprove: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  headerReason: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: null,
    transformer: booleanTransformer,
  })
  directorApprove: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  directorReason: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: false,
    transformer: booleanTransformer,
  })
  isFinish: boolean;

  //   ------------------------------------------------------------------- //

  @ManyToOne(() => MasterStatusLeave, (sta) => sta.leave)
  mas_statusleave: MasterStatusLeave;

  @ManyToOne(() => MasterUser, (user) => user.trn_leave)
  mas_user: MasterUser;

  @OneToMany(() => LeaveApprove, (leaveApprove) => leaveApprove.trn_leave)
  trn_leaveapprove: LeaveApprove[];
}
