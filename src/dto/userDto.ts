export type UserDTO = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export interface LoginDTO {
  email: string;
  password: string;
}
