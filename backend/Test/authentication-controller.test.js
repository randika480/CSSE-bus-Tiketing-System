const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

test("test login Controller without relevant data", async () => {
  const result = await supertest(app).post("/matrix/api/auth/login").send({});
  expect(result.body.desc).toBe("Can not find the user - Please check again");
});
test("test login Controller with relevant data", async () => {
  const result = await supertest(app).post("/matrix/api/auth/login").send({
    email: "inspector1@gmail.com",
    password: "inspector1",
    role: "inspector",
  });
  expect(result.statusCode).toBe(200);
});
test("test login registerInspector without previously used email address", async () => {
  const result = await supertest(app).post("/matrix/api/auth/inspector").send({
    email: "inspector1@gmail.com",
    password: "inspectorX",
    role: "inspector",
  });
  expect(result.statusCode).toBe(500);
});
