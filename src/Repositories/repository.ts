import tutorSchema from '../Model/modelTutor';

// Tutor ->
class UserRepositoryTutors {
  async getTutor() {
    const select = await tutorSchema.find();
    return select;
  }

  async emailExists(email: string) {
    try {
      const tutor = await tutorSchema.findOne({ email });
      if (tutor) {
        throw new Error('email already belongs to a tutor');
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createTutor(body: any) {
    try {
      const newtutor = await tutorSchema.create(body);
      return newtutor;
    } catch (error) {
      throw error;
    }
  }

  async existsTutor(idTutor: string) {
    const tutor = await tutorSchema.findById(idTutor);
    if (!tutor) {
      throw new Error("No tutor with informed id");
    }
    return tutor?.id;
  }

  async bodyValidation(body: any) {
    const {
      name, phone, email, dateOfBirth, zipCode,
    } = body;
    if (!name || !phone || !email || !dateOfBirth || !zipCode) {
      throw new Error('missing or incorrect body fields');
    }
    return {
      name,
      phone,
      email,
      dateOfBirth,
      zipCode,
    };
  }

  async updateTutor(id: string, body: any) {
    try {
      await tutorSchema.findByIdAndUpdate(id, body);
      return body;
    } catch (error) {
      throw error;
    }
  }

  async petInTutor(idTutor: string) {
    await tutorSchema.findById(idTutor).then((tutor) => {
      if (!(tutor?.pets.length === 0)) {
        throw new Error('Unable to delete an existing owner with pets');
      }
    });
  }

  async deleteTutor(id: string) {
    try {
      const deleteTutor = await tutorSchema.findByIdAndDelete(id);
      return deleteTutor;
    } catch (error) {
      throw error;
    }
  }
}

// Pet ->
class UserRepositoryPets {
  async existsTutor(idTutor: string) {
    const tutor = await tutorSchema.findById(idTutor);
    if (!tutor) {
      throw new Error("No tutor with informed id");
    }
    return tutor?.id;
  }

  async existsPet(idTutor: string, idPet: string) {
    await tutorSchema.findById(idTutor).then((tutor) => {
      const petExists = tutor?.pets.some((pet) => pet.id === idPet);
      if (!petExists) {
        throw new Error('The entered id does not belong to any pet');
      }
    });
  }
  // async postPet(idTutor: any, body: any) {
  //   try {
  //     const newPet = await tutorSchema.findById(idTutor).then((tutor) => {
  //       tutor?.pets.push(body);
  //       tutor?.save();
  //     });
  //     return newPet;
  //   } catch (error) {
  //     throw new Error("error creating a pet");
  //   }
  // }
  async postPet(idTutor: any, body: any) {
    try {
      const tutor = await tutorSchema.findById(idTutor);
      if (!tutor) {
        throw new Error("Tutor not found");
      }
      tutor.pets.push(body);
      await tutor.save();

      return tutor; 

    } catch (error) {
      throw new Error("Error creating a pet");
    }
  }
  
  async putPet(idTutor: string, idPet: string, body: any) {
    try {
      await tutorSchema.findById(idTutor).then((tutor) => {
        const pet = tutor?.pets.id(idPet);
        pet?.set(body);
        tutor?.save();
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePet(idTutor: string, idPet: string) {
    try {
      await tutorSchema.findById(idTutor).then((tutor) => {
        tutor?.pets.pull(idPet);
        tutor?.save();
      });
    } catch (error) {
      throw error;
    }
  }
}

// Auth ->
class UserRepositoryAuth {
  async authenticateUser(email: string, password: string) {
    try {
      await tutorSchema.findOne({ email }).then((tutor) => {
        if (!(tutor?.password === password)) {
          throw new Error('Incorrect email or password fields');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default { UserRepositoryTutors, UserRepositoryPets, UserRepositoryAuth };
