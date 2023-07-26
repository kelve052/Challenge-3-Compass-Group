import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authenticateUserServices from "../Services/authServices";

const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ Msg: "Email or password error" });
  } else {
    try {
      await authenticateUserServices(email, password);
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      res.status(400).json({ Msg: `Error: ${error.message}` });
    }
  }
};

export default { auth };
