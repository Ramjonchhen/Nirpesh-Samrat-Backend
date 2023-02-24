"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const seller_1 = require("./entities/seller");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'samrat',
    password: 'samrat',
    port: 5432,
    database: 'yatru',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*{.js,.ts}', seller_1.Seller],
    subscribers: [],
    migrations: [],
});
const DbConnect = () => {
    exports.AppDataSource.initialize()
        .then(() => {
        console.log('Database Connected');
    })
        .catch((error) => console.log(error));
};
exports.DbConnect = DbConnect;
