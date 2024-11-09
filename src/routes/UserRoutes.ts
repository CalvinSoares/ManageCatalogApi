import { Router } from "express";
import AuthController from "../auth/AuthController";
import { authenticateJWT } from "../middleware/AuthMiddleware";
import { authrorizeRole } from "../auth/AuthorizeRoles";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/signup", AuthController.signUp);
userRouter.post("/signin", AuthController.signIn);

userRouter.get(
  "/users",
  authenticateJWT,
  authrorizeRole(["admin", "user"]),
  UserController.GetAll
);

userRouter.get(
  "/user/:id",
  authenticateJWT,
  authrorizeRole(["admin", "user"]),
  UserController.findOneById
);

userRouter.put(
  "/update/user/:id",
  authenticateJWT,
  authrorizeRole(["admin", "user"]),
  UserController.UpdateUser
);
userRouter.delete(
  "/delete/user/:id",
  authenticateJWT,
  authrorizeRole(["admin", "user"]),
  UserController.DeleteOne
);

export default userRouter;
