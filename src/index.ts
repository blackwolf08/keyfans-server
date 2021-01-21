import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { PORT } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { InitResolver } from "./resolvers/init";
import chalk from "chalk";

const main = async () => {
  // ORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // Express
  const app = express();

  //  GraphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [InitResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Key Fans Server");
  });

  app.listen(PORT, () => {
    console.log(chalk.green(`Server started on localhost:${PORT}`));
  });
};

main().catch((err) => {
  console.log(err);
});
