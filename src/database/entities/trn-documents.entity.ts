import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MasterUser } from './mas-user.entity';

@Entity({ name: 'trn_documents' })
export class Documents extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  path: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  originalName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  typeFile: string;

  // --------------------------------------------------------------------------------------------- //

  @ManyToOne(() => MasterUser, (user) => user.trn_documents)
  mas_user: MasterUser;
}
