import request from "supertest";
import { app } from "../app";
import { start, close } from "../server";

describe("Test for DELETE method", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let tutorId: string;
  let petId: string;
  let server: any;

  beforeAll((done) => {
    server = start(5002);
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
        name: "Test tutor - DELETE",
        password: "12345",
        phone: "123456789",
        email: "tutorDELETE@test.com",
        date_of_birth: "2000-12-12",
        zip_code: "12345",
      });
    tutorId = response.body.new_tutor._id;
    petId = null;
  });

  afterEach(async () => {
    await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
  });

  it("Should delete a tutor with correct authentication and id", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(204);
  });

  it("Should return 400 if tutor have a pet associeted", async () => {
    const PetResponse = await request(app)
      .post(`/pet/${tutorId}`)
      .set("Authorization", authToken)
      .send({
        name: "Pet 1",
        species: "dog",
        carry: "p",
        weight: 5,
        date_of_birth: "2000-01-01",
      });
    petId = PetResponse.body.Pet._id;
    const DeleteResponse = await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
    await request(app).delete(`/pet/${petId}/tutor/${tutorId}`) .set("Authorization", authToken);
    expect(DeleteResponse.status).toBe(400);
    expect(DeleteResponse.body).toEqual({
        Msg: 'Error deleting: Unable to delete an existing owner with pets'
    });
  });

  it("Should return 400 if it does have incorrect id", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId + 1}`)
      .set("Authorization", authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        Msg: 'Error deleting: No tutor with informed id'
    });
  });

  it("Should return 401 if it does not have authentication", async () => {
    const response = await request(app).delete(`/tutor/${tutorId}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        Msg: 'token not provided'
    });
  });

  it("Should return 401 if it does have invalid authentication", async () => {
    const response = await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", `Bearer 123`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
        Msg: 'incorrect token'
    });
  });
});
