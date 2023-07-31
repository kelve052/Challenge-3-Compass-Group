import Repository from './repository';
const RepositoryPets = Repository.UserRepositoryPets;

jest.mock('../Model/modelTutor', () => ({
  findById: (idTutor: string) => {
    const tutor = {
      id: 'ba6cf261-b33f-431f-91f8-74dd0403e571',
      pets: [],
    };
    return tutor;
  },
  save: jest.fn(),
}));

describe('Test Pets: Post', () => {
  it('postPet', async () => {
    const idTutor = 'ba6cf261-b33f-431f-91f8-74dd0403e571';
    const body = {
      name: 'James',
      species: 'Gato',
      carry: 'p',
      weight: 2,
      date_of_birth: '2000-12-12',
    };

    const response = await new RepositoryPets().postPet(idTutor, body);

    expect(response).toBeInstanceOf(Object);
  });

  it('postPet - ERROR', async () => {
    const idTutor = 'ba6cf261-b33f-431f-91f8-74dd0403e571';
    const body = { name: 'James', species: 'Gato', carry: 'p', weight: 2, date_of_birth: '2000-12-12' };

    const tutorWithPet = {
      id: 'ba6cf261-b33f-431f-91f8-74dd0403e571',
      pets: [{ name: 'James', species: 'Gato', carry: 'p', weight: 2, date_of_birth: '2000-12-12' }],
    };

    jest.spyOn(require('../Model/modelTutor'), 'findById').mockImplementationOnce(() => {
      return Promise.resolve(tutorWithPet);
    });

    await expect(new RepositoryPets().postPet(idTutor, body)).rejects.toThrow('error creating a pet');
  });
});
