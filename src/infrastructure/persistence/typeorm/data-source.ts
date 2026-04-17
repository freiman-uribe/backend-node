import "reflect-metadata";
import fs from "node:fs";
import path from "node:path";
import { DataSource } from "typeorm";
import { env } from "../../../config/env";
import { ExternalDataOrmEntity } from "./entities/external-data.entity";

const dbAbsolutePath = path.resolve(env.sqlitePath);
const dbDirectory = path.dirname(dbAbsolutePath);

if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

export const appDataSource = new DataSource({
  type: "sqlite",
  database: dbAbsolutePath,
  entities: [ExternalDataOrmEntity],
  synchronize: true,
  logging: false
});
