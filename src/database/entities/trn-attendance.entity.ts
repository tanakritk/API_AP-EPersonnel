import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MasterUser } from './mas-user.entity';
import { StatusEnum } from 'src/app/enum/attendance.enum';

@Entity('trn_attendance')
export class Attendance extends BaseEntity {
  @Column({ type: 'date', nullable: false })
  attendanceDate: Date;

  @Column({ type: 'datetime', nullable: true })
  checkInTime: Date;

  @Column({ type: 'datetime', nullable: true })
  checkOutTime: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  status: StatusEnum;

  @ManyToOne(() => MasterUser, (user) => user.trn_attendance)
  mas_user: MasterUser;
}
