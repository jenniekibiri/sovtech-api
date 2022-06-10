import { GraphQLObjectType, GraphQLString } from "graphql";
const FilmType = new GraphQLObjectType({
    name: "Film",
    description: "This  represents films",
    fields: () => ({
      title: {
        type: GraphQLString,
      },
      release_date: {
        type: GraphQLString,
      },
      //director
      director: {
        type: GraphQLString,
      },
      //producer
      producer: {
        type: GraphQLString,
      },
      //openin craw
      opening_crawl: {
        type: GraphQLString,
      },
    }),
  });
  export default FilmType;