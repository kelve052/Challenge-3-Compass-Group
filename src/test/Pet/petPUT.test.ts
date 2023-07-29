import request from "supertest";
import { app } from "../../app";
import { start, close } from "../../server";

describe("Test for PUT method on Pets", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .envconst authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let server: any;
  let tutorId: string;
  let petId: string;

  beforeAll((done) => {
    server = start(5011);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  beforeEach(async () => {
    const tutorResponse = await request(app)
      .post("/tutors")
      .set("Authorization", authToken)
      .send({
        name: "Test pet - PUT",
        password: "12345",
        phone: "123456789",
        email: "petPUT@test.com",
        date_of_birth: "2000-12-12",
        zip_code: "12345",
      });
    tutorId = tutorResponse.body.new_tutor._id;

    const petResponse = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", authToken)
      .send({
        name: "Test pet - PUT",
        species: "dog",
        carry: "p",
        weight: 5,
        date_of_birth: "2000-01-01",
      });
    petId = petResponse.body.Pet._id;
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

  it("Should edited a pet with the correct fields, id and authentication", async () => {
    const petData = {
      name: "Test pet - PUT (EDITED)",
      species: "dog",
      carry: "m",
      weight: 7,
      date_of_birth: "2000-01-01",
    };
    const response = await request(app)
      .put(`/pet/${petId}/tutor/${tutorId}`)
      .set("Authorization", authToken)
      .send(petData);
    expect(response.status).toBe(200);
  });

  //   it("Should return 400 with the incorrect fields", async () => {
  //     const petData = {
  //       name: "Test pet - PUT (EDITED)",
  //       species: "dog",
  //       carry: "m",
  //       weight: "a", // incorret field
  //       date_of_birth: "2000-01-01",
  //     };
  //     const response = await request(app)
  //       .put(`/pet/${petId}/tutor/${tutorId}`)
  //       .set("Authorization", authToken)
  //       .send(petData);
  //     expect(response.status).toBe(400);
  //   });

  //   it("Should return 400 if doesn't contain all fields", async () => {
  //     const petData = {
  //       name: "Test pet - PUT (EDITED)",
  //       species: "dog",
  //       carry: "m",
  //       date_of_birth: "2000-01-01",
  //     };
  //     const response = await request(app)
  //       .put(`/pet/${petId}/tutor/${tutorId}`)
  //       .set("Authorization", authToken)
  //       .send(petData);
  //     expect(response.status).toBe(400);
  //   });

  it("Should return 400 with incorret tutorId", async () => {
    const response = await request(app)
      .put(`/pet/${petId}/tutor/${tutorId + 1}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "Failed to UPDATE pet: No tutor with informed id",
    });
  });

  it("Should return 400 with incorret petId", async () => {
    const response = await request(app)
      .put(`/pet/${petId + 1}/tutor/${tutorId}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "Failed to UPDATE pet: The entered id does not belong to any pet",
    });
  });

  it("Should return 400 if it does not have authentication", async () => {
    const response = await request(app).put(`/pet/${petId}/tutor/${tutorId}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "token not provided",
    });
  });

  it("Should return 401 if it does have invalid authentication", async () => {
    const response = await request(app)
      .put(`/pet/${petId}/tutor/${tutorId}`)
      .set("Authorization", `Bearer 123`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      Msg: "incorrect token",
    });
  });
});
