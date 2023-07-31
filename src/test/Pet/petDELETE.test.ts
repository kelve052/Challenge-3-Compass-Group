import request from 'supertest';
import { app } from '../../app';
import { start, close } from '../../server';

describe('Test for DELETE method on Tutors', () => {
  const authToken = `Bearer ${process.env.TOKEN!}`; // Make sure the token is in the .env
  let tutorId: string;
  let petId: string;
  let server: any;

  beforeAll((done) => {
    server = start(5012);
    done();
  });

  afterAll((done) => {
    server = close();
    done();
  });

  beforeEach(async () => {
    const tutorResponse = await request(app).post('/tutors').set('Authorization', authToken).send({
      name: 'Test pet - DELETE',
      password: '12345',
      phone: '123456789',
      email: 'petDELETE@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '12345',
    });
    tutorId = tutorResponse.body.newTutor._id;

    const petResponse = await request(app).post(`/pet/${tutorId}`).set('Authorization', authToken).send({
      name: 'Test pet - DELETE',
      species: 'dog',
      carry: 'p',
      weight: 5,
      dateOfBirth: '2000-01-01',
    });
    petId = petResponse.body.Pet._id;
  });

  afterEach(async () => {
    await request(app).delete(`/pet/${petId}/tutor/${tutorId}`).set('Authorization', authToken);
    await request(app).delete(`/tutor/${tutorId}`).set('Authorization', authToken);
    petId = null;
  });

  it('Should delete a pet with correct authentication and id', async () => {
    const response = await request(app).delete(`/pet/${petId}/tutor/${tutorId}`).set('Authorization', authToken);
    expect(response.status).toBe(204);
  });

  it('Should return 400 if it does have incorrect tutorId', async () => {
    const response = await request(app)
      .delete(`/pet/${petId}/tutor/${tutorId + 1}`)
      .set('Authorization', authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'Error deleting pet: No tutor with informed id',
    });
  });

  it('Should return 400 if it does have incorrect petId', async () => {
    const response = await request(app)
      .delete(`/pet/${petId + 1}/tutor/${tutorId}`)
      .set('Authorization', authToken);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'Error deleting pet: The entered id does not belong to any pet',
    });
  });

  it('Should return 400 if it does not have authentication', async () => {
    const response = await request(app).delete(`/pet/${petId}/tutor/${tutorId}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      Msg: 'token not provided',
    });
  });

  it('Should return 401 if it does have invalid authentication', async () => {
    const response = await request(app).delete(`/pet/${petId}/tutor/${tutorId}`).set('Authorization', 'Bearer 123');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      Msg: 'incorrect token',
    });
  });
});
