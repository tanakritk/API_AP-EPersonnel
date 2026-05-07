import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MasterUser } from './mas-user.entity';
@Entity({name: "trn_education"})
export class Education extends BaseEntity {
    @Column({ type: 'varchar', length: 100, nullable: true })
    level: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    location: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    branch: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    endYear: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    grage: string

    // ----------------------------------------------------------------------- //

    @ManyToOne( () => MasterUser, (user) => user.trn_education )
    mas_user: MasterUser

}