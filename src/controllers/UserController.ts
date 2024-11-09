import type { Request, Response } from "express";
import UserService from "../services/UserService";
import { transformToUserDTO } from "../utils/converterDTO/transformToUserDTO";

class UserController {
  async GetAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      if (!users) {
        res.status(404).json({ message: "No users found" });
        return;
      }

      const usersDTO = users.map((u) => transformToUserDTO(u));

      res.status(200).json(usersDTO);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro Get Users", error: (err as Error).message });
    }
  }

  async findOneById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
      return;
    } catch (err) {
      res.status(500).json({
        message: "Error Update user failed",
        error: (err as Error).message,
      });
      return;
    }
  }

  async UpdateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = req.body;

      const userUpdate = await UserService.updateById(id, user);

      if (!userUpdate) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(200).json(userUpdate);
      return;
    } catch (err) {
      res.status(500).json({
        message: "Error Update user failed",
        error: (err as Error).message,
      });
      return;
    }
  }

  async DeleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userDeleted = await UserService.deleteById(id);

      if (!userDeleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(userDeleted);
    } catch (err) {
      res.status(500).json({
        message: "Error Delete failed",
        error: (err as Error).message,
      });
      return;
    }
  }
}

export default new UserController();
