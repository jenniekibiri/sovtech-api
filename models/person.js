import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import  FilmType  from "./film.js";
import fetch from "node-fetch";

const filmsUrl = "https://swapi.dev/api/films/";
const planetsUrl = "https://swapi.dev/api/planets/";


const PersonType = new GraphQLObjectType({
  name: "People",
  description: "This  represents people",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLString,
    },
    mass: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    homeworld: {
      type: GraphQLString,
    },

    url: {
      type: GraphQLString,
    },
    page: {
      type: GraphQLString,
    },
    count: {
      type: GraphQLInt,
    },
    hair_color: {
      type: GraphQLString,
    },
    skin_color: {
      type: GraphQLString,
    },
    eye_color: {
      type: GraphQLString,
    },
    birth_year: {
      type: GraphQLString,
    },

    films: {
      type: new GraphQLList(FilmType),
      async resolve(parent, args) {
        let ids = parent.films.map((film) => {
          return film.split("/")[5];
        });
        let films = await Promise.all(
          ids.map(async (id) => {
            let response = await fetch(`${filmsUrl}${id}`);
            let data = await response.json();
            return data;
          })
        );
        return films;
      },
    },

    planet: {
      type: GraphQLString,
      async resolve(parent, args) {
        const id = parent.homeworld.split("/")[5];

        const res = await fetch(planetsUrl + id);
        const data = await res.json();

        return data.name;
      },
    },
  }),
});




export default PersonType;