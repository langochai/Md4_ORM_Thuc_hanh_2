
import "reflect-metadata"

import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({

    type: "mysql",

    host: "localhost",

    port: 3306,

    username: "root",

    password: "langochai1998",

    database: "bruh",

    synchronize: true,

    logging: false,

    entities: ["dist/src/entity/*.js"],

    migrations: ["dist/src/migrations/*.js"],

})

