import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleEnum, SexEnum } from 'src/app/enum/mas-user.enum';
import { Documents } from './trn-documents.entity';
import { Mate } from './mate.entity';
import { Child } from './child.entity';
import { booleanTransformer } from 'src/helpers/function';
import { Education } from './trn-education.entity';
import { Insignia } from './trn-insignia.entity';
import { Academic } from './trn-academic.entity';
import { Attendance } from './trn-attendance.entity';
import { Leave } from './trn-leave.entity';
import { LeaveApprove } from './trn-leave-approve.entity';

@Entity({ name: 'mas_user' })
export class MasterUser extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ type: 'longtext', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  surname: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  idCardNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ethnicity: string;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statusUser: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bloodGroup: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  position: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statusWork: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  professionalLicenseNo: string;                                // เลขที่ใบประกอบวิชาชีพครู

  @Column({ type: 'varchar', length: 100, nullable: true })
  administratorLicenseNo: string;                               // เลขที่ใบอนุญาตผู้บริหาร

  @Column({ type: 'varchar', length: 100, nullable: true })
  supervisorLicenseNo: string;                                  // เลขที่ใบประกอบวิชาชีพศึกษานิเทศน์

  @Column({ type: 'date', nullable: true })
  professionalLicenseEndDate: string;                           // วันหมดอายุใบประกอบวิชาชีพครู

  @Column({ type: 'date', nullable: true })
  administratorLicenseEndDate: string;                          // วันหมดอายุใบอนุญาตผู้บริหาร

  @Column({ type: 'date', nullable: true })
  supervisorLicenseEndDate: string;                             // วันหมดอายุใบประกอบวิชาชีพศึกษานิเทศน์

  @Column({ type: 'varchar', length: 100, nullable: true })
  yearService: string;

  @Column({ type: 'date', nullable: true })
  yearServiceStartDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subjects: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: true,
    transformer: booleanTransformer,
  })
  isActive: boolean;

  @Column({
    type: 'bit',
    nullable: false,
    default: false,
    transformer: booleanTransformer,
  })
  isRefactorPassword: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true }) // ช่วงชั้น
  class: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // หัวหน้ากลุ่มสาระ
  subjectGroupLeader: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // หัวหน้าฝ่ายงาน
  headWorkDepartment: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // รอง ผอ
  deputyDirector: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: RoleEnum.User,
  })
  role: RoleEnum;

  @Column({ type: 'varchar', length: 100, nullable: true }) // หัวหน้าฝ่ายงาน
  sex: SexEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  academicStanding: string;

  // --------------------------------------------------------------------------------------------- //

  @OneToMany(() => Documents, (docs) => docs.mas_user)
  trn_documents: Documents[];

  @OneToOne(() => Mate, (mate) => mate.mas_user, { cascade: true })
  mate: Mate;

  @OneToMany(() => Child, (child) => child.mas_user, { cascade: true })
  child: Child[];

  @OneToMany(() => Education, (edu) => edu.mas_user, { cascade: true })
  trn_education: Education[];

  @OneToMany(() => Insignia, (insignia) => insignia.mas_user, { cascade: true })
  trn_insignia: Insignia[];

  @OneToMany(() => Academic, (academic) => academic.mas_user, { cascade: true })
  trn_academic: Academic[];

  @OneToMany(() => Attendance, (attendance) => attendance.mas_user, {
    cascade: true,
  })
  trn_attendance: Attendance[];

  @OneToMany(() => Leave, (leave) => leave.mas_user, {
    cascade: true,
  })
  trn_leave: Leave[];

  @OneToMany(() => LeaveApprove, (leaveApprove) => leaveApprove.mas_user)
  trn_leaveapprove: LeaveApprove[];
}
