import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Leave } from './trn-leave.entity';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { LeaveApprove } from './trn-leave-approve.entity';

@Entity({ name: 'mas_statusleave' })
export class MasterStatusLeave {
  @PrimaryColumn({ type: 'int', unsigned: true })
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  //   ------------------------------------------------------------------- //

  @OneToMany(() => Leave, (leave) => leave.mas_statusleave)
  leave: Leave[];

  @OneToMany(() => LeaveApprove, (leaveApprove) => leaveApprove.mas_statusleave)
  trn_leaveapprove: LeaveApprove[];
}
