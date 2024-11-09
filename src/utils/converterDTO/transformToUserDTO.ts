import type { CreateUserDTO, UserDTO } from "../../dto/userDto";

export const transformToUserDTO = (user: UserDTO | null): UserDTO => {
  if (!user || typeof user !== "object") {
    throw new Error("Invalid user data");
  }
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
