import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "keyfans",
  entities: [Post],
  debug: !__prod__,
  type: "postgresql",
  password: process.env.DB_PASSWORD,
} as Parameters<typeof MikroORM.init>[0];
