import request from "supertest";
import { app } from "../app";
import { start, close } from "../server";

describe("Test for GET method on Tutors", () => {
  const authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let server: any;

  beforeAll((done) => {
    server = start(5001);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  it("Should return a list of tutors with authentication", async () => {
    const response = await request(app)
      .get("/tutors")
      .set("Authorization", authToken);
    expect(response.status).toBe(200);
  });

  it('It should return 400 if it does not have authentication', async () => {
    const response = await request(app)
      .get('/tutors');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        Msg: 'token not provided'
    });
  });

  it('It should return 401 if it does have invalid authentication', async () => {
    const response = await request(app)
      .get('/tutors')
      .set("Authorization", `Bearer 123`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
        Msg: 'incorrect token'
    });
  });
});
