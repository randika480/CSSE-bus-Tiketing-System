const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

test("test get-journeys controller with relevant data", async () => {
  const result = await supertest(app)
    .get("/matrix/api/passenger/get-journeys")
    .send({});
  expect(result.statusCode).toBe(200);
});

