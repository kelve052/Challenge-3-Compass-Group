import UserRepositoryAuth from '../Repositories/repository';

const RepositoryAuth = new UserRepositoryAuth.UserRepositoryAuth();

const authenticateUserServices = async (email: string, password: string) => {
  try {
    await RepositoryAuth.authenticateUser(email, password);
  } catch (error) {
    throw error;
  }
};

export default authenticateUserServices;
