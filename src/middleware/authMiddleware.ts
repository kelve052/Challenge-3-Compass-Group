import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(400).json({ Msg: "token not provided" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      next();
    } catch (error) {
      res.status(401).json({ Msg: "incorrect token" });
    }
  }
};

export default authentication;
