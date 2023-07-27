import UserRepository from '../Repositories/repository';

const RepositoryTutors = UserRepository.UserRepositoryTutors;

class UserServicesTutor {
  async select() {
    try {
      return await new RepositoryTutors().getTutor();
    } catch (error) {
      throw error;
    }
  }

  async create(body: any) {
    try {
      const { email } = body;
      await new RepositoryTutors().emailExists(email); // check if any tutor already has the email
      return await new RepositoryTutors().createTutor(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: any) {
    try {
      await new RepositoryTutors().existsTutor(id); // check if tutor exists
      const newBody = await new RepositoryTutors().bodyValidation(body);
      // ^make sure the body has all required fields
      return await new RepositoryTutors().updateTutor(id, newBody);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await new RepositoryTutors().existsTutor(id);
      await new RepositoryTutors().petInTutor(id); // checks if the owner has pets
      await new RepositoryTutors().deleteTutor(id);
    } catch (error) {
      throw error;
    }
  }
}
export default UserServicesTutor;
