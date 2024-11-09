import type { NextFunction, Response } from "express";
import type { TypeRequestUser } from "../@types/UserType";

export const authrorizeRole = (allowedRoles: string[]) => {
  return (req: TypeRequestUser, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Acesso negado " });
    }
    next();
  };
};
