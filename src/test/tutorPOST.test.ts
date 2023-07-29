import request from "supertest";
import { app } from "../app";
import { start, close } from "../server";

describe("Test for POST method on Tutors", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .envconst authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let server: any;
  let tutorId: string;

  beforeAll((done) => {
    server = start(5003);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  afterEach(async () => {
    await request(app)
      .delete(`/tutor/${tutorId}`)
      .set("Authorization", authToken);
  });

  it("Should create a new tutor", async () => {
    const tutorData = {
      name: "John Doe",
      password: "123",
      phone: "123456789",
      email: "teste@test.com",
      date_of_birth: "2000-12-12",
      zip_code: "61760000",
    };

    const response = await request(app).post("/tutors").send(tutorData);
    tutorId = response.body.new_tutor._id;
    expect(response.status).toBe(201);
  });

  it("Should return 400 if doesn't contain all fields", async () => {
    const tutorData = {
      name: "John Doe",
      phone: "123456789",
      email: "teste@test.com",
      date_of_birth: "2000-12-12",
      zip_code: "61760000",
    };

    const response = await request(app).post("/tutors").send(tutorData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "Failed to create tutor: Tutor validation failed: password: Path `password` is required.",
    });
  });

  it("Should return 400 if fields are invalid", async () => {
    const tutorData = {
      name: "John Doe",
      password: "123",
      phone: "abc",
      email: "teste@test.com",
      date_of_birth: "2000-12-12",
      zip_code: "abc",
    };

    const response = await request(app).post("/tutors").send(tutorData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'Failed to create tutor: Tutor validation failed: phone: Cast to Number failed for value \"abc\" (type string) at path \"phone\", zip_code: Cast to Number failed for value \"abc\" (type string) at path \"zip_code\"',
    });
  });

  it("Should return 400 if email is invalid", async () => {
    const tutorData = {
      name: "John Doe",
      password: "123",
      phone: "123456789",
      email: "testetest.com",
      date_of_birth: "2000-12-12",
      zip_code: "61760000",
    };

    const response = await request(app).post("/tutors").send(tutorData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: "Failed to create tutor: Tutor validation failed: email: The email entered is not a valid email",
    });
  });

  it("Should return 400 if email repeats", async () => {
    const tutorData1 = {
      name: "John Doe",
      password: "123",
      phone: "123456789",
      email: "teste@test.com",
      date_of_birth: "2000-12-12",
      zip_code: "61760000",
    };
    const tutorData2 = {
      name: "John Doe",
      password: "123",
      phone: "123456789",
      email: "teste@test.com",
      date_of_birth: "2000-12-12",
      zip_code: "61760000",
    };

    const response1 = await request(app).post("/tutors").send(tutorData1);
    expect(response1.status).toBe(201);
    tutorId = response1.body.new_tutor._id;
    const response2 = await request(app).post("/tutors").send(tutorData2);
    expect(response2.status).toBe(400);
    expect(response2.body).toEqual({
      Msg: "Failed to create tutor: email already belongs to a tutor",
    });
  });
});
