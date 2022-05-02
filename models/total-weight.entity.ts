import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Node } from "./node.entity"

@Entity()
export class TotalWeight {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    weight: number

    @Column()
    unit: string

    @OneToOne(() => Node, (node) => node.totalWeight, { onDelete: "CASCADE" })
    @JoinColumn()
    node: Node
}