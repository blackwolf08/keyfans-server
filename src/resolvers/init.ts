import { Resolver, Query } from "type-graphql";

@Resolver()
export class InitResolver {
  @Query(() => String)
  init() {
    return "Init Success";
  }
}
