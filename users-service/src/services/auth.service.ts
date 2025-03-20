import * as bcryptjs from "bcryptjs";
import userRepository from "../repositories/user.repository";

export const checkUserCredentials = async (
  email: string,
  password: string
): Promise<boolean> => {
  console.log({ email, password });

  const user = await userRepository.findOne({ where: { email } });
  if (!user || !user.password) {
    console.log(false);

    return false;
  }
  const isPasswordMatch = await bcryptjs.compare(password, user.password);

  return isPasswordMatch;
};
