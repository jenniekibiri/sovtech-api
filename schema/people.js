import graphql, { GraphQLInt } from "graphql";
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import fetch from "node-fetch";
import PersonType from "../models/person.js";

const url = "https://swapi.dev/api/people/";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    person: {
      type: PersonType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const res = await fetch(`${url}?search=${args.name}`);
        const data = await res.json();
        return data.results[0];
      },
    },
    people: {
      type: new GraphQLList(PersonType),
      args: {
        page: { type: GraphQLInt },
      },

      async resolve(parent, args) {
        const res = await fetch(`${url}?page= ${args.page ? args.page : 1}`);
        const data = await res.json();
        return data.results;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
