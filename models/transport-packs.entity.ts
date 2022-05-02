import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Node } from "./node.entity"
import { Shipment } from "./shipment.entity"

@Entity()
export class TransportPacks {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Node, (node) => node.trasportPacks, { cascade: true })
    nodes: Node[]

    @OneToOne(() => Shipment, (shipment) => shipment.transportPacks, { onDelete: 'CASCADE' })
    @JoinColumn()
    shipment: Shipment
    
}