import request from "supertest";
import { app } from "../../app";
import { start, close } from "../../server";

describe("Test for POST method on Pets", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .envconst authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let server: any;
  let tutorId: string;
  let petId: string;

  beforeAll((done) => {
    server = start(5010);
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
        name: "Test pet - POST",
        password: "12345",
        phone: "123456789",
        email: "petPOST@test.com",
        dateOfBirth: "2000-12-12",
        zipCode: "12345",
      });
    tutorId = response.body.newTutor._id;
    petId = null;
  });

  afterEach(async () => {
    await request(app)
      .delete(`/pet/${petId}/tutor/${tutorId}`)
      .set("Authorization", authToken);
    await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
    petId = null;
  });

  it("Should create a new pet with the correct fields, id and authentication", async () => {
    const petData = {
      name: "Pet Test - POST",
      species: "dog",
      carry: "p",
      weight: 5,
      dateOfBirth: "2000-01-01",
    };
    const response = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", authToken)
      .send(petData);
    petId = response.body.Pet._id;

    expect(response.status).toBe(201);
  });

  it("Should return 400 with the incorrect fields", async () => {
    const petData = {
      name: "Pet Test - POST",
      species: "dog",
      carry: "p",
      weight: "a",
      dateOfBirth: "2000-01-01",
    };
    const response = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", authToken)
      .send(petData);

    expect(response.status).toBe(400);
  });

  it("Should return 400 if doesn't contain all fields", async () => {
    const petData = {
      name: "Pet Test - POST",
      species: "dog",
      weight: "a",
      dateOfBirth: "2000-01-01",
    };
    const response = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", authToken)
      .send(petData);

    expect(response.status).toBe(400);
  });

  it("Should return 400 with incorret ID", async () => {
    const response = await request(app)
      .post(`/pet/${tutorId + 1}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "Failed to CREATE pet: No tutor with informed id",
    });
  });

  it("Should return 400 if it does not have authentication", async () => {
    const response = await request(app).post(`/pet/${tutorId}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "token not provided",
    });
  });

  it("Should return 401 if it does have invalid authentication", async () => {
    const response = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", `Bearer 123`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      Msg: "incorrect token",
    });
  });
});
