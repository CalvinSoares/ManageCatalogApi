import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { TypeRequestUser, TypeUserToken } from "../@types/UserType";

export const authenticateJWT = (
  req: TypeRequestUser,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers.authorization;
  console.log("to aq");

  if (!headerToken) {
    res.status(401).send({ error: "Token não informado" });
    return;
  }

  const [typeToken, token] = headerToken.split(" ");
  console.log("token da req", token);

  if (token === "null") {
    res.status(401).send({ error: "Token é null" });
    return;
  }

  if (process.env.JWT_SECRET === undefined) {
    return res
      .status(500)
      .json({ msg: "Variável de ambiente Secret não definida" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);

  req.user = decoded as TypeUserToken;
  next();
};
