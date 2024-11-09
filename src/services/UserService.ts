import type { CreateUserDTO, UserDTO } from "../dto/userDto";
import { User } from "../models/UserModel";

import { transformToUserDTO } from "../utils/converterDTO/transformToUserDTO";

class UserService {
  async getAll(): Promise<UserDTO[] | null> {
    const users = await User.find().lean();

    if (!users || users.length === 0) {
      return null;
    }

    const userDTOs = users.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    return userDTOs;
  }

  async add(data: CreateUserDTO): Promise<UserDTO | null> {
    const { password, email, ...restOfData } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return null;
    }
    const userCreate = (await User.create({
      password,
      email,
      ...restOfData,
    })) as UserDTO | null;

    const userDTO = transformToUserDTO(userCreate);
    return userDTO;
  }

  async findById(id: string) {
    const userFind = (await User.findOne(
      { _id: id },
      {},
      { lean: true }
    )) as UserDTO | null;

    if (!userFind) {
      return null;
    }
    const userDTO = transformToUserDTO(userFind);
    return userDTO;
  }

  async updateById(id: string, data: CreateUserDTO) {
    const userUpdate = (await User.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true, lean: true }
    )) as UserDTO | null;

    if (!userUpdate) {
      return null;
    }
    const userDTO = transformToUserDTO(userUpdate);
    return userDTO;
  }

  async deleteById(id: string) {
    const userDeleted = (await User.findOneAndDelete(
      { _id: id },
      { new: true, lean: true }
    )) as UserDTO | null;
    if (!userDeleted) {
      return null;
    }
    const userDTO = transformToUserDTO(userDeleted);
    return userDTO;
  }
}

export default new UserService();
