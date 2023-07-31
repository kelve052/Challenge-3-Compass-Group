import request from 'supertest';
import { app } from '../../app';
import { start, close } from '../../server';

describe('Test for PUT method on Tutors', () => {
  const authToken = `Bearer ${process.env.TOKEN!}`; // Make sure the token is in the .envconst authToken = "Bearer " + process.env.TOKEN!; // Make sure the token is in the .env
  let server: any;
  let tutorId: string;

  beforeAll((done) => {
    server = start(5004);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  beforeEach(async () => {
    const response = await request(app).post('/tutors').set('Authorization', authToken).send({
      name: 'Test tutor - PUT',
      password: '12345',
      phone: '123456789',
      email: 'tutorPUT@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '12345',
    });
    tutorId = response.body.newTutor._id;
  });

  afterEach(async () => {
    await request(app).delete(`/tutor/${tutorId}`).set('Authorization', authToken);
  });

  it('Should edit with the correct fields, id and authentication', async () => {
    const tutorData = {
      name: 'Edited Tutor - PUT',
      password: '321',
      phone: '987654321',
      email: 'testPUT@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000',
    };
    const response = await request(app).put(`/tutor/${tutorId}`).set('Authorization', authToken).send(tutorData);
    expect(response.status).toBe(200);
  });

  it('Should return 400 with the incorrect fields', async () => {
    const tutorData = {
      name: 'Edited Tutor - PUT',
      password: '321',
      phone: 'abc',
      email: 'testPUT@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000',
    };
    const response = await request(app).put(`/tutor/${tutorId}`).set('Authorization', authToken).send(tutorData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'update failed: Cast to Number failed for value "abc" (type string) at path "phone"',
    });
  });

  it('Should return 400 with incorrect id', async () => {
    const tutorData = {
      name: 'Edited Tutor - PUT',
      password: '321',
      phone: '987654321',
      email: 'testPUT@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000',
    };
    const response = await request(app)
      .put(`/tutor/${tutorId + 1}`)
      .set('Authorization', authToken)
      .send(tutorData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'update failed: No tutor with informed id',
    });
  });

  it('Should return 401 if it does not have authentication', async () => {
    const response = await request(app).put(`/tutor/${tutorId}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'token not provided',
    });
  });

  it('Should return 401 if it does have invalid authentication', async () => {
    const response = await request(app).put(`/tutor/${tutorId}`).set('Authorization', 'Bearer 123');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      Msg: 'incorrect token',
    });
  });
});
