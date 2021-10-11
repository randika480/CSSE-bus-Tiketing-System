const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

test("test createJourney controller without relevent data (error message)", async () => {
  const result = await supertest(app)
    .post("/matrix/api/manager/createJourney")
    .send({});
  expect(result.body.desc).toBe(
    "Error in creating Journey-ValidationError: transporterID: Path `transporterID` is required., conductorID: Path `conductorID` is required., departure: Path `departure` is required., destination: Path `destination` is required., takeOffTime: Path `takeOffTime` is required., arrivalTime: Path `arrivalTime` is required."
  );
});

test("test createJourney controller without relevent data (status code)", async () => {
  const result = await supertest(app)
    .post("/matrix/api/manager/createJourney")
    .send({});
  expect(result.statusCode).toBe(500);
});

test("test createTransporter controller with relevent data (success message)", async () => {
  const result = await supertest(app)
    .post("/matrix/api/manager/createTransporter")
    .send({
      type: "train",
      VRN: "JUI6789",
      activationStatus: "Active",
      costID: "61595fcab35b520a80f1192d",
    });
  expect(result.body.success).toBe(true);
});

test("test updateTransporter controller with relevent data (status code)", async () => {
  const result = await supertest(app)
    .put("/matrix/api/manager/updateTransporter")
    .send({
      TID: "615afd4b458ff55e7c1d62ae",
      type: "train",
      VRN: "JUI6789",
      activationStatus: "Deactivated",
      costID: "61595fcab35b520a80f1192d",
    });
  expect(result.statusCode).toBe(200);
});

test("test CalculateCost controller with relevent data (calculated cost)", async () => {
  const result = await supertest(app)
    .get("/matrix/api/manager/calculateCost")
    .send({});
  expect(result.body.Cost).toBe(3020);
});
