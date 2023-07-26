import * as express from "express";
const router = express.Router();
import tutroControllers from "../Controllers/tutorsControllers";
import petControllers from "../Controllers/petControllers";
import authControllers from "../Controllers/auth";
import authentication from "../middleware/authMiddleware";

//rotas tutor
router
  .route("/tutors")
  .get(authentication, tutroControllers.TutorsGet)
  .post(tutroControllers.TutorsPost);
router
  .route("/tutor/:id")
  .delete(authentication, tutroControllers.TutorDelete)
  .put(authentication, tutroControllers.TutorPut);

//rotas pet
router.route("/pet/:tutorId").post(authentication, petControllers.PetPost);
router
  .route("/pet/:petId/tutor/:tutorId")
  .put(authentication, petControllers.PutPet)
  .delete(authentication, petControllers.DeletePet);

//route auth
router.route("/auth").post(authControllers.auth);

export default router;
