import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from "typeorm"
import { Organization } from "./organization.entity"
import { TransportPacks } from "./transport-packs.entity"

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    referenceId: string

    @Column({ nullable: true })
    estimatedTimeArrival?: Date

    @ManyToMany(() => Organization)
    @JoinTable()
    organizations: Organization[]

    @OneToOne(() => TransportPacks, (transportPack) => transportPack.shipment, { cascade: true, onDelete: 'CASCADE' })
    transportPacks: TransportPacks
}