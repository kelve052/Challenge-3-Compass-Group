import request from 'supertest';
import { app } from '../app';
import { start, close } from '../server';

describe('Test for POST method on Tutors', () => {
  const authToken = `Bearer ${process.env.TOKEN!}`; // Make sure the token is in the .env
  let server: any;
  let tutorId: string;

  beforeAll((done) => {
    server = start(5020);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  beforeEach(async () => {
    const response = await request(app).post('/tutors').send({
      name: 'Test tutor - AUTH',
      password: '12345',
      phone: '123456789',
      email: 'tutorAUTH@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '12345',
    });
    tutorId = response.body.newTutor._id;
  });

  afterEach(async () => {
    await request(app).delete(`/tutor/${tutorId}`).set('Authorization', authToken);
  });

  it('Should create a new token', async () => {
    const userData = {
      email: 'tutorAUTH@test.com',
      password: '12345',
    };
    const response = await request(app).post('/auth').send(userData);
    expect(response.status).toBe(200);
  });

  it('Should return 400 for incorrect password', async () => {
    const userData = {
      email: 'tutorAUTH@test.com',
      password: `12345${6}`,
    };
    const response = await request(app).post('/auth').send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'Error: Incorrect email or password fields',
    });
  });

  it('Should return 400 for incorrect email', async () => {
    const userData = {
      email: `${6}tutorAUTH@test.com`,
      password: '12345',
    };
    const response = await request(app).post('/auth').send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'Error: Incorrect email or password fields',
    });
  });
});
