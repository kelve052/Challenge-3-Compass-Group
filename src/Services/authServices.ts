import UserRepositoryAuth from "../Repositories/repository";
const repositoryAuth = new UserRepositoryAuth.UserRepositoryAuth();

const authenticateUserServices = async (email: string, password: string) => {
  try {
    await repositoryAuth.authenticateUser(email, password);
  } catch (error) {
    throw error;
  }
};

export default authenticateUserServices;
