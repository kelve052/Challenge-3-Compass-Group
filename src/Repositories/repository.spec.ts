import Repository from "./repository";
const RepositoryTutors = Repository.UserRepositoryTutors

jest.mock('../Model/modelTutor', ()=>({
  findById: (idTutor: string)=>{
    if (!idTutor) {
      throw new Error('Nehym tutor with informed id');
    }
    return {id: idTutor};
  }
}))

describe('Test Tutor: put', () => {
  it('existsTutor( check if tutor already exists )', async()=>{
    
    const resposta = await new RepositoryTutors().existsTutor('ba6cf261-b33f-431f-91f8-74dd0403e571')
    expect(resposta).toBe('ba6cf261-b33f-431f-91f8-74dd0403e571')
  })
});
