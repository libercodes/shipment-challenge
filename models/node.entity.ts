import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { TotalWeight } from "./total-weight.entity"
import { TransportPacks } from "./transport-packs.entity"

@Entity()
export class Node {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @OneToOne(() => TotalWeight, (totalWeight) => totalWeight.node, { cascade: true, onDelete: 'CASCADE' })
    totalWeight: TotalWeight

    @ManyToOne(() => TransportPacks, { onDelete: 'CASCADE' })
    trasportPacks: TransportPacks
}