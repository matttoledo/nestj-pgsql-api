import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });



export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'alienguise!@#$%',
  database: 'verly',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};