import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { TypeRequestUser, TypeUserToken } from "../@types/UserType";

export const authenticateJWT = (
  req: TypeRequestUser,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    res.status(401).send({ error: "Token não informado" });
    return;
  }

  const [typeToken, token] = headerToken.split(" ");

  if (token === "null") {
    res.status(401).send({ error: "Token é null" });
    return;
  }

  if (process.env.JWT_SECRET === undefined) {
    res.status(500).json({ msg: "Variável de ambiente Secret não definida" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded as TypeUserToken;
  next();
};
