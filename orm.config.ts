import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config({
  path: '.env',
  //   path: `.env.${process.env.NODE_ENV}`,
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: {
    ssl: true,
  },
  entities: ['apps/**/src/**/*.entity{.ts,.js}'],
  migrations: ['database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
