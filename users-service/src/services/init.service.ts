import { UserDataSource } from "../config/typeorm.config";
import { User } from "../entities/user.entity";
import bcryptjs from "bcryptjs";


const createAdminUser = async () => {
  const userRepository = UserDataSource.getRepository(User);

  const adminUser = await userRepository.findOneBy({ firstName: "Admin" });

  if (!adminUser) {
    const admin = new User();
    admin.firstName = "Admin";
    admin.email = "admin@example.com";
    admin.password = await bcryptjs.hash("adminpassword", 10);
    admin.lastName = "User";
    admin.isAdmin = true;

    await userRepository.save(admin);
    console.log("✅ Default Admin user created!");
  }
};
export const initSetup = async() => {
    await createAdminUser;
}