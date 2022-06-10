const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {graphqlHTTP} = require("express-graphql");
const dotenv = require("dotenv");
const schema = require("./schema/people.js");


dotenv.config();
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = 4000;

const server = app.listen(port, console.log(`server running on port ${port}`));

modile.exports = server;
