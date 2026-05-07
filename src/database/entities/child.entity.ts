import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MasterUser } from "./mas-user.entity";

@Entity({ name: 'child' })
export class Child extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: true })
    title: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    firstname: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    surname: string

    @Column({ type: 'varchar', length: 1000, nullable: true })
    address: string

    @Column({ type: 'varchar', length: 20, nullable: true })
    idCardNumber: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    phone: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    nationality: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    ethnicity: string

    // ---------------------------------------------------------------------------------- //

    @ManyToOne(() => MasterUser, (user) => user.child)
    mas_user: MasterUser
}