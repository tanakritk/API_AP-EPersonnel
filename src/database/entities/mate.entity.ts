import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MasterUser } from "./mas-user.entity";

@Entity({name: "mate"})
export class Mate extends BaseEntity {
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

    // --------------------------------------------------------------------------------------------- //

    @OneToOne( () => MasterUser, (user) => user.mate )
    @JoinColumn()
    mas_user: MasterUser

}