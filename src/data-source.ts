import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Seller } from './entities/seller';
import { Hotel } from './entities/hotel';
import { Room } from './entities/room';
import { Location } from './entities/location';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'samrat',
  password: 'samrat',
  port: 5432,
  database: 'yatru',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*{.js,.ts}', Seller, Hotel, Location, Room],
  subscribers: [],
  migrations: [],
});

export const DbConnect = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database Connected');
    })
    .catch((error) => console.log(error));
};
