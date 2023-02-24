import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from './seller';
import { Room } from './room';
import { Location } from './location';


export enum HotelStatus {
    HC = "Hotel Created",
    HU = "Hotel Updated",
    HD = "Hotel Deleted",
}


@Entity()
export class Hotel {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name?: string

    @Column()
    address?: string

    @CreateDateColumn()
    createdDate?: Date

    @Column({
        type: "enum",
        enum: HotelStatus,
        default: HotelStatus.HC,
    })
    status:HotelStatus

    @ManyToOne(()=>Seller, (seller) => seller.hotels)
    seller: Seller

    @OneToMany(()=>Room, (room)=>room.hotel)
    rooms:Room[]

    @ManyToOne(()=>Location, (location)=>location.hotels)
    location:Location
}