//import { SnakeNamingStrategy } from './snake-naming.strategy';
import { DefaultNamingStrategy } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import appConfiguration from '../app.configuration';
import { join } from 'path';

module.exports = {
  type: (appConfiguration().APP.DB.TYPE as any),
  host: appConfiguration().APP.DB.HOST,
  database: appConfiguration().APP.DB.DATABASE,
  port: parseInt(appConfiguration().APP.DB.PORT as any),
  username: appConfiguration().APP.DB.USERNAME,
  password: appConfiguration().APP.DB.PASSWORD,
  logging: false,
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new DefaultNamingStrategy(),
  entities: [join(__dirname, '../api/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')]
} as TypeOrmModuleOptions;
