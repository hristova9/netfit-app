import { config } from "../config/config";

export const getUsersByIds = async (userIds: string[]) => {
  try {
    const response = await fetch(`${config.usersServiceUrl}/users/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: userIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error in getUsersByIds:", error);
    return [];
  }
};

export const getUserById = async (userId: string) => {
  const response = await fetch(`${config.usersServiceUrl}/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return await response.json();
};
