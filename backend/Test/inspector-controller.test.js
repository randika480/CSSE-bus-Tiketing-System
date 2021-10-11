const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

http: test("test getCurrentJourneyTokens Controller  ", async () => {
  const result = await supertest(app)
    .get(
      "/matrix/api/inspector/getCurrentJourneyTokens/615895ed336dc2462c408880"
    )
    .send({});
  expect(result.statusCode).toBe(200);
});

test("test checkInquiries Controller without journeyID", async () => {
  const result = await supertest(app)
    .get("/matrix/api/inspector/checkInquiries")
    .send({});
  expect(result.desc).toBe(undefined);
});

test("test getAllJourneys", async () => {
  const result = await supertest(app)
    .get("/matrix/api/inspector/getAllJourneys")
    .send({});
  expect(result.statusCode).toBe(200);
});

test("test getOneJourney", async () => {
  const result = await supertest(app)
    .get("/matrix/api/inspector/getOneJourney")
    .send({ jID: "6158959b336dc2462c40887e" });
  expect(result.statusCode).toBe(200);
});
