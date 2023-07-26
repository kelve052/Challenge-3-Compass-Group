import { Request, Response } from "express";
import UserServicesTutor from "../Services/tutorServices";

// Tutor ->
const TutorsGet = async (req: Request, res: Response) => {
  try {
    const select = await new UserServicesTutor().select();
    res.status(200).json({ Msg: "Registered tutors", Tutors: select });
  } catch (error) {
    res.status(400).json({ Msg: `Error when searching for tutors: ${error.message}` });
  }
};

const TutorsPost = async (req: Request, res: Response) => {
  try {
    const result = await new UserServicesTutor().create(req.body);
    return res.status(201).json({ Msg: "Successfully created tutor", new_tutor: result });
  } catch (error) {
    return res.status(400).json({ Msg: `Failed to create tutor: ${error.message}` });
  }
};

const TutorPut = async (req: Request, res: Response) => {
  try {
    const idTutor = req.params.id;
    const update = await new UserServicesTutor().update(idTutor, req.body);
    res.status(200).json({ Msg: "Update Sucefull", Tutor: update });
  } catch (error) {
    res.status(400).json({ Msg: `update failed: ${error.message}` });
  }
};

const TutorDelete = async (req: Request, res: Response) => {
  try {
    const idTutor = req.params.id;
    await new UserServicesTutor().delete(idTutor);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ Msg: `Error deleting: ${error.message}` });
  }
};

export default {
  TutorsGet,
  TutorsPost,
  TutorPut,
  TutorDelete,
};
