import UserRepository from "../Repositories/repository";

const repositoryTutors = UserRepository.UserRepositoryTutors;

class UserServicesTutor {
  async select() {
    try {
      return await new repositoryTutors().getTutor();
    } catch (error) {
      throw error;
    }
  }

  async create(body: any) {
    try {
      const { email } = body;
      await new repositoryTutors().emailExists(email); //check if any tutor already has the email
      return await new repositoryTutors().createTutor(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: any) {
    try {
      await new repositoryTutors().existsTutor(id); //check if tutor exists
      const newBody = await new repositoryTutors().bodyValidation(body); // make sure the body has all required fields
      return await new repositoryTutors().updateTutor(id, newBody);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string) {
    try {
      await new repositoryTutors().existsTutor(id);
      await new repositoryTutors().petInTutor(id); //checks if the owner has pets
      await new repositoryTutors().deleteTutor(id);
    } catch (error) {
      throw error;
    }
  }
}
export default UserServicesTutor;
