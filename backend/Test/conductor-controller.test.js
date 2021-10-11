const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

test("test passenger-count Controller", async () => {
  const result = await supertest(app)
    .get("/matrix/api/conductor/passenger-count")
    .send({
      journeyID: "615895ed336dc2462c408880",
    });
  expect(result.statusCode).toBe(200);
});

test("test passenger-detail Controller", async () => {
  const result = await supertest(app)
    .get("/matrix/api/conductor/passenger-details")
    .send({
      passengerID: "6159a78ce6e3c75aec5bff42",
    });
  expect(result.statusCode).toBe(200);
});

test("test passenger-detail Controller with wrong ID ", async () => {
  const result = await supertest(app)
    .get("/matrix/api/conductor/passenger-details")
    .send({
      passengerID: "6159a78ce6e3c75aec5bff89",
    });
  expect(result.body.passenger).toBe(null);
});


