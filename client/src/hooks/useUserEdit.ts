// import { useState } from "react";
// import { editUser } from "../services/userService";
// import { User } from "../models/User.model";
// // import apiFetch from "../utils/apiFetch";

import { useState } from "react";
import { User, UserEdit } from "../models/User.model";
import { editUser } from "../services/userService";

// const useUserEdit = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateProfile = async (userData: User) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await editUser(userData);

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       return response;
//     } catch (err) {
//         if (err instanceof Error) {
//             setError(err.message);
//         }
//         setError("Unknown error during editing!")
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const deleteProfile = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await apiFetch(`/users/${userId}`, {
// //         method: "DELETE",
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to delete profile");
// //       }

// //       return true;
// //     } catch (err: any) {
// //       setError(err.message);
// //       return false;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   return { updateProfile, loading, error };
// };

// export default useUserEdit;

export const useUserEdit = () => {
  const [error, setError] = useState<string>("");

  const updateProfile = async (user: User, formData: UserEdit) => {
    let { firstName, lastName, description } = formData;
    firstName = firstName.trim();
    lastName = lastName.trim();
    description = description.trim();
    console.log("in update profile ", { ...user, firstName, lastName, description });
    

    if (!firstName || !lastName) {
      setError("Name fields are required!");
      return false;
    }

    try {
      const result = await editUser({ ...user, firstName, lastName, description });
      console.log(result);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError("Error: " + error.message);
      } else {
        setError("Unknown error occured!");
      }

      return false;
    }
  };

  return {
    updateProfile,
    error,
  };
};
