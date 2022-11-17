import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
export async function createDatabaseConnection() {
  const entityPath = path.join(__dirname, 'src/domain/**/*.entity.ts');
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DB_SCHEMA,
    entities: [entityPath],
    synchronize: false,
  });
}
