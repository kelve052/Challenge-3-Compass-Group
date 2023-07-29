import Repository from "./repository";
const RepositoryTutors = Repository.UserRepositoryTutors

jest.mock('../Model/modelTutor', ()=>({
  find: ()=>{
    try {
      return [{name: "teste", phone: "54899..."}]
    } catch (error) {
      throw error
    }
  },
  findOne: jest.fn((email: string) => {
    const emailDb: string = 'teste@gmail.com.br';
    if (email == emailDb) {
      return Promise.reject(new Error('email already belongs to a tutor'));
    }
    return null;
  }),
  create: jest.fn((body: any) => body),
  findById: (idTutor: string)=>{
    const id = 'ba6cf261-b33f-431f-91f8-74dd0403e571'
    if (idTutor != id) {
      throw new Error('Nehym tutor with informed id');
    }
    return {id: idTutor};
  },
  findByIdAndUpdate: jest.fn()
}))

describe('Test Tutor: Get', ()=>{
  it('getTutor ( select all tutors ) ', async ()=>{
    const response = await new RepositoryTutors().getTutor()

    expect(response).toBeInstanceOf(Array)
  })
})


describe('Test Tutor: Post', () => {
  it('emailExists (check if any tutor already has the email)', async () => {
    const email = 'teste222@gmail.com.br';
    const response = await new RepositoryTutors().emailExists(email);
    expect(response).toBe(null);
  });

  it('emailExists - ERROR', async () => { //Error
    const email = 'teste@gmail.com.br';
    await expect(new RepositoryTutors().emailExists(email)).resolves.toBeNull();
  });

  it('createTutor', async()=>{
    const body = {"name": "Alex Abreu", "password": "p#llk145$", "phone": 69993638638, "email": "jon21as@paidepet.com", "date_of_birth": "2000-12-12", "zip_code": 61760000,}
    const response = await new RepositoryTutors().createTutor(body)

    expect(response).toBe(body)
  })
})



describe('Test Tutor: put', () => {
  it('existsTutor( check if tutor already exists )', async()=>{
    
    const response = await new RepositoryTutors().existsTutor('ba6cf261-b33f-431f-91f8-74dd0403e571')
    expect(response).toBe('ba6cf261-b33f-431f-91f8-74dd0403e571')
  })

  it('existsTutor - ERROR', async()=>{  //Error
    await expect(new RepositoryTutors().existsTutor("id-fake")).rejects.toThrow('Nehym tutor with informed id');
  })

  it('bodyValidation( checks if all required fields exist )', async ()=>{
    const body = {name: "teste", phone:"6998568547", email: "teste@teste", dateOfBirth: "2000-12-12", zipCode: "61760000",}
    const response = await new RepositoryTutors().bodyValidation(body)

    const properties = ['name', 'phone', 'email', 'dateOfBirth', 'zipCode']
    properties.map((itens) => expect(response).toHaveProperty(itens)
    )
  })

  it('bodyValidation - ERROR', async ()=>{ //Error
    const body = {name: "teste", phone:"6998568547", Fake: "teste@teste", dateOfBirth: "2000-12-12", Fake2: "61760000",}
    await expect(new RepositoryTutors().bodyValidation(body)).rejects.toThrow('missing or incorrect body fields');

  })

  it('updateTutor', async ()=>{
    const body = {name: "teste", phone:"6998568547", email: "teste@teste", dateOfBirth: "2000-12-12", zipCode: "61760000",}
    const response = await new RepositoryTutors().updateTutor('uuiddhbfb0', body)

    expect(response).toBe(body)
  })
});