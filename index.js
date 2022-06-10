import express from "express";
import morgan from "morgan";
import cors from "cors";
import {graphqlHTTP} from "express-graphql";
import dotenv from "dotenv";
import schema from "./schema/people.js";
dotenv.config();
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 4000;
app.listen(port, console.log(`server running on port ${port}`));
