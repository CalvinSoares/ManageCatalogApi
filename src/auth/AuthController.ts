import { User } from "../models/UserModel";
import UserService from "../services/UserService";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async signUp(req: Request, res: Response) {
    const user = req.body;
    try {
      const userCreated = await UserService.add(user);
      if (!userCreated) {
        res.status(409).json({ error: "O cadastro já existe" });
        return;
      }
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro ao registrar usuário", error: err });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          res.status(401).json({ msg: "Invalid credentials" });
          return;
        }
      } catch (err) {}

      if (process.env.JWT_SECRET === undefined) {
        res
          .status(500)
          .json({ msg: "Variável de ambiente Secret não definida" });
        return;
      }

      const token = jwt.sign(
        {
          userName: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Erro ao fazer login", error: err });
    }
  }
}

export default new AuthController();
