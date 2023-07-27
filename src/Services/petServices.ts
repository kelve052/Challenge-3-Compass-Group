import UserRepository from '../Repositories/repository';

const RepositoryPets = UserRepository.UserRepositoryPets;

class userServicesPets {
  async postPet(idTutor: string, body: any) {
    try {
      const tutor = await new RepositoryPets().existsTutor(idTutor); // check if tutor exists
      const createPet = await new RepositoryPets().postPet(tutor, body);
      return createPet;
    } catch (error) {
      throw error;
    }
  }

  async putPet(idTutor: string, idPet: string, body: any) {
    try {
      await new RepositoryPets().existsTutor(idTutor); // check if tutor exists
      await new RepositoryPets().existsPet(idTutor, idPet); // check if pet exists
      await new RepositoryPets().putPet(idTutor, idPet, body);
    } catch (error) {
      throw error;
    }
  }

  async deletePet(idTutor: string, idPet: string) {
    try {
      await new RepositoryPets().existsTutor(idTutor); // check if tutor exists
      await new RepositoryPets().existsPet(idTutor, idPet); // check if pet exists
      await new RepositoryPets().deletePet(idTutor, idPet);
    } catch (error) {
      throw error;
    }
  }
}

export default userServicesPets;
