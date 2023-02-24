import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from './seller';
import { Location } from './location';
import { Hotel } from './hotel';


export enum RoomRowStatus {
    RC = "Room Created",
    RU = "Room Updated",
    RD = "Room Deleted",
}

export enum RoomType {
    E = "Economic",
    D = "Deluxe",
    S = "Standard"
}


@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column({ type: "float" })
    price?: number

    @Column()
    images?: string

    @Column()
    noOfBed?: number

    @Column()
    roomNo: number

    // @Column({
    //     type: "enum",
    //     enum: RoomType,
    //     default: RoomType.E,
    // })
    @Column()
    roomtype: string


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

    @Column()
    gym?: boolean

    @CreateDateColumn()
    createdDate?: Date


    @Column({
        type: "enum",
        enum: RoomRowStatus,
        default: RoomRowStatus.RC,
    })
    status: RoomRowStatus


    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel
}