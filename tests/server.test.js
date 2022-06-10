
const server = require("./testserver.js");
const supertest = require("supertest");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
describe("server", () => {
    it("should return a 200 status code", async () => {
        const res = await supertest(server).get("/graphql");
        expect(res.status).toBe(200);
    }
    );
}
);
