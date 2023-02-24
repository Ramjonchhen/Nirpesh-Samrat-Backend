import { Column, PrimaryGeneratedColumn, Entity, OneToMany, CreateDateColumn } from "typeorm";
import { Hotel } from "./hotel";
import { Location } from "./location";



export enum SellerStatus {
    SC = "Seller Created",
    SU = "Seller Updated",
    SD = "Seller Deleted",
}


@Entity()
export class Seller {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column({ nullable: false, default: 'Samrat' })
    firstName?: string

    @Column({ nullable: false, default: 'Karki' })
    lastName?: string

    @Column({ nullable: false, default: 'samratkarki@yatru.com' })
    email?: string

    @Column({ nullable: false, default: '' })
    password?: string

    @CreateDateColumn()
    createdDate?: Date

    @Column({
        type: "enum",
        enum: SellerStatus,
        default: SellerStatus.SC,
    })
    status: SellerStatus

    @OneToMany(() => Hotel, (hotel) => hotel.seller)
    hotels: Hotel[]

    @OneToMany(() => Location, (location) => location.seller)
    locations: Location[]

}