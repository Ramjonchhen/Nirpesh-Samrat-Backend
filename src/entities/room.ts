import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from './seller';
import { Location } from './location';
import { Hotel } from './hotel';


export enum HotelRoomStatus {
    HC = "Location Created",
    HU = "Location Updated",
    HD = "Hotel Room Deleted",
}

export enum RoomType {
    E="Economic",
    D = "Deluxe",
    S="Standard"
}


@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    id?: string

   //@ManyToOne

   
    @Column()
    price?: number

    @Column()
    images?: string

    @Column()
    noOfBed?: number

    @Column()
    roomNo: number

    @Column({
        type: "enum",
        enum: RoomType,
        default: RoomType.E,
    })
    roomtype:RoomType


    @Column()
    sceneryFacing?: boolean

    @Column()
    rental?: boolean

    @Column()
    ticketing?: boolean

    @Column()
    balcony?: boolean

    @Column()
    swimmingPool?: boolean

    @CreateDateColumn()
    createdDate?: Date


    @Column({
        type: "enum",
        enum: HotelRoomStatus,
        default: HotelRoomStatus.HC,
    })
    status:HotelRoomStatus


    @ManyToOne(()=>Hotel, (hotel)=>hotel.rooms)
    hotel:Hotel
}