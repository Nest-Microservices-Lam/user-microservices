// datasource.ts (crear en la raíz del proyecto)
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

//----------------------------------------------------

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false, // Importante: nunca true en producción
  logging: process.env.NODE_ENV === 'development', // Logs solo en desarrollo
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
