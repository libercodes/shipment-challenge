import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Organization {
    @PrimaryColumn()
    id: string

    @Column()
    code: string
}