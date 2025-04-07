import { useState } from "react";
import { useCreatePostMutation } from "../store/posts/postsApi"; // Adjust this according to your API structure
// import { Post } from "../models/Post.model"; // Adjust this to your Post model
import { extractErrorMessage } from "../utils/errorHandler"; // Assuming you have an error handler
import { Post } from "../models/Post.model";
import { User } from "../models/User.model";
import { validateFile } from "../utils/validateImage";

interface CreatePostFormData {
    description: string;
    photo?: File;
  }
  

export const usePostCreate = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

//   const [postData, setPostData] = useState<Post>({
//     id: "",
//     description: "",
//     photo: "",
//     createdAt: "",
//     ownerId: "",
//     ownerFirstName: "",
//     ownerLastName: "",
//     ownerAvatar: "",
//   });
const [createPost, { isLoading, error: mutationError }] = useCreatePostMutation();

//   const [createPost, { isLoading, error: mutationError }] =
//     useCreatePostMutation();

//   const handleChange = (
//     updatedFields: Partial<{ description: string; photo?: File }>
//   ) => {
//     setPostData((prev) => ({ ...prev, ...updatedFields }));
//   };

  const createNewPost = async (user: User, formData: CreatePostFormData) => {
    const { description: rawDescription, photo } = formData;
    const description = rawDescription.trim();

    console.log("description ", description);
    console.log("photo ", photo);
    

    if (!description) {
      setError("Description is required!");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      let photoUrl = "";
      if (photo) {
        console.log("in photo");
        
        const validationError = validateFile(photo);
        if (validationError) {
          setError(validationError);
          return false;
        }

        const uploadDataImage = new FormData();
        uploadDataImage.append("file", photo);
        uploadDataImage.append("upload_preset", "netfit-posts");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/netfit/image/upload`,
          {
            method: "POST",
            body: uploadDataImage,
          }
        );
        const data = await response.json();

        console.log("upload data: ", data, data.secure_url);
        

        if (!data.secure_url) {
          throw new Error("Failed to upload image to Cloudinary.");
        }

        photoUrl = data.secure_url;
      }
      const newPost: Omit<Post, "id"> = {
        ownerId: user.id,
        ownerFirstName: user.firstName,
        ownerLastName: user.lastName,
        ownerAvatar: user.avatar || "",
        description,
        photo: photoUrl,
        createdAt: new Date().toISOString(),
      };
        const result = await createPost(newPost).unwrap();

        console.log("post created: ", result);
        
        return result;
    } catch (error) {
      if (mutationError) {
        setError(extractErrorMessage(mutationError));
      } else if (error instanceof Error) {
        setError(extractErrorMessage(error) || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createNewPost,
    error,
    loading: isLoading || loading,
  };
};
