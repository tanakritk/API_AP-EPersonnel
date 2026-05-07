import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MasterUser } from "./mas-user.entity";
import { booleanTransformer } from "src/helpers/function";

@Entity({name: "trn_academic"})
export class Academic extends BaseEntity {
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string

    @Column({type: 'date', nullable: true})
    receiptDate: string

    @Column({type: 'date', nullable: true})
    dueDate: string

    @Column({type: 'varchar', length: 1000, nullable: true})
    note: string

    @Column({
        type: 'tinyint',
        nullable: false,
        default: true,
        transformer: booleanTransformer
    })
    isActive: boolean



    @ManyToOne( () => MasterUser, (user) => user.trn_academic )
    mas_user: MasterUser
}