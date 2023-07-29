import Repository from "./repository";
const RepositoryTutors = Repository.UserRepositoryTutors

jest.mock('../Model/modelTutor', ()=>({
  findById: (idTutor: string)=>{
    if (!idTutor) {
      throw new Error('Nehym tutor with informed id');
    }
    return {id: idTutor};
  },
  findByIdAndUpdate: jest.fn()
}))

describe('Test Tutor: put', () => {
  it('existsTutor( check if tutor already exists )', async()=>{
    
    const response = await new RepositoryTutors().existsTutor('ba6cf261-b33f-431f-91f8-74dd0403e571')
    expect(response).toBe('ba6cf261-b33f-431f-91f8-74dd0403e571')
  })

  it('bodyValidation( checks if all required fields exist )', async ()=>{
    const body = {name: "teste", phone:"6998568547", email: "teste@teste", dateOfBirth: "2000-12-12", zipCode: "61760000",}
    const response = await new RepositoryTutors().bodyValidation(body)

    const properties = ['name', 'phone', 'email', 'dateOfBirth', 'zipCode']
    properties.map((itens) => expect(response).toHaveProperty(itens)
    )
  })

  it('updateTutor', async ()=>{
    const body = {name: "teste", phone:"6998568547", email: "teste@teste", dateOfBirth: "2000-12-12", zipCode: "61760000",}
    const response = await new RepositoryTutors().updateTutor('uuiddhbfb0', body)

    expect(response).toBe(body)
  })
});