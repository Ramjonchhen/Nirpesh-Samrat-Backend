"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRoom = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let hotelRoom = class hotelRoom {
    id;
    hotelName;
    location;
    price;
    postedBy;
    image;
    bed;
    sceneryFacing;
    rental;
    ticketing;
    balcony;
    swimmingPool;
    createdDate;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], hotelRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], hotelRoom.prototype, "hotelName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], hotelRoom.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], hotelRoom.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], hotelRoom.prototype, "postedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], hotelRoom.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], hotelRoom.prototype, "bed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], hotelRoom.prototype, "sceneryFacing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], hotelRoom.prototype, "rental", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], hotelRoom.prototype, "ticketing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], hotelRoom.prototype, "balcony", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], hotelRoom.prototype, "swimmingPool", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], hotelRoom.prototype, "createdDate", void 0);
hotelRoom = __decorate([
    (0, typeorm_1.Entity)()
], hotelRoom);
exports.hotelRoom = hotelRoom;
