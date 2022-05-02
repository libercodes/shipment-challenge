import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    url: process.env.POSTGRES_DB_URL,
    type: "postgres",
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    synchronize: true,
    logging: false,
})
