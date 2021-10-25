import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const checkIfUserAlreadyExist = this.usersRepository.findByEmail(email);
    if (checkIfUserAlreadyExist) {
      throw new Error("This email is already in use");
    }
    const createUser = this.usersRepository.create({ name, email });
    return createUser;
  }
}

export { CreateUserUseCase };
