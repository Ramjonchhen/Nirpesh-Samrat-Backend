import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Hotel } from "./hotel";
import { Seller } from "./seller";



export enum LocationRowStatus {
    LC = "Location Created",
    LU = "Location Updated",
    LD = "Location Deleted",
}


@Entity()
export class Location {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name?: string

    @CreateDateColumn()
    createdDate?: Date

    @Column({
        type: "enum",
        enum: LocationRowStatus,
        default: LocationRowStatus.LC,
    })
    status:LocationRowStatus

    @OneToMany(()=>Hotel, (hotel)=>hotel.location)
    hotels:Hotel[]

    @ManyToOne(()=>Seller,(seller)=>seller.locations)
    seller: Seller;
} 