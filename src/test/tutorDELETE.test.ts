import request from "supertest";
import { app } from "../app";
import { start, close } from "../server";

describe("Test for DELETE method", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let tutorId: string;
  let server: any;

  beforeAll((done) => {
    server = start(3002);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  beforeEach(async () => {
    const response = await request(app)
      .post("/tutors")
      .set("Authorization", authToken)
      .send({
        name: "Tutor de Teste",
        password: "123",
        phone: "123456789",
        email: "tutor@test.com",
        date_of_birth: "2000-12-12",
        zip_code: "12345",
      });
    tutorId = response.body.new_tutor._id;
  });

  afterEach(async () => {
    await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
  });

  it("Delete a tutor with correct authentication and id", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(204);
  });

  it("It should return 400 if it does have incorrect id", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId + 1}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(400);
  });

  it("It should return 401 if it does not have authentication", async () => {
    const response = await request(app).delete(`/tutor/${tutorId}`);
    expect(response.status).toBe(400);
  });

  it("It should return 401 if it does have invalid authentication", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", `Bearer 123`);
    expect(response.status).toBe(401);
  });
});
