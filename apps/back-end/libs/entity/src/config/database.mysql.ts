import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user/User.entity';
import { Channel } from '../domain/channel/Channel.entity';
import { DailyViews } from '../domain/daily_views/DailyViews.entity';

export async function createDatabaseConnection() {
  // const entityPath = path.join(
  //   __dirname,
  //   `/../../libs/entity/src/domain/**/*.entity.js`,
  // );
  // console.log(entityPath);
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DB_SCHEMA,
    entities: [User, Channel, DailyViews],
    synchronize: false,
  });
}
