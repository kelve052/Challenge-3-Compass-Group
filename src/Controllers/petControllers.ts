import { Request, Response } from 'express';
import UserServicesPets from '../Services/petServices';

// pet->
const PetPost = async (req: Request, res: Response) => {
  try {
    const idTutor = req.params.tutorId;
    const create = await new UserServicesPets().postPet(idTutor, req.body);
    const petCreate = create.pets[create.pets.length - 1];
    res.status(201).json({ Msg: 'Create pet sucefull', Pet: petCreate });
  } catch (error) {
    res.status(400).json({ Msg: `Failed to CREATE pet: ${error.message}` });
  }
};

const PutPet = async (req: Request, res: Response) => {
  try {
    const idTutor = req.params.tutorId;
    const idPet = req.params.petId;
    await new UserServicesPets().putPet(idTutor, idPet, req.body);
    res.status(200).json({ Msg: 'Update pet sucefull', Pet: req.body });
  } catch (error) {
    res.status(400).json({ Msg: `Failed to UPDATE pet: ${error.message}` });
  }
};

const DeletePet = async (req: Request, res: Response) => {
  try {
    const idTutor = req.params.tutorId;
    const idPet = req.params.petId;
    await new UserServicesPets().deletePet(idTutor, idPet);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ Msg: `Error deleting pet: ${error.message}` });
  }
};

export default {
  PetPost,
  PutPet,
  DeletePet,
};
