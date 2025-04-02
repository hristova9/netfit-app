import { IPost } from "../models/post.model";
import postRepository, {
  findAllPosts,
  findPostById,
  savePost,
  deletePost,
} from "../repositories/post.repository";
import _ from "lodash";

export const getAllPosts = async () => {
  try {
    return await findAllPosts();
  } catch (error) {
    throw new Error("Database error: Unable to retrieve posts.");
  }
};

export const getPostById = async (id: string) => {
  const post = await findPostById(id);
  if (!post) throw new Error("Post not found");
  return post;
};

export const createPost = async (data: IPost): Promise<IPost> => {
  const newPost = postRepository.create(data);
  return await savePost(newPost);
};

export const updatePost = async (id: string, data: Partial<IPost>) => {
  const post = await getPostById(id);

  if (!post) {
    throw new Error(`Post not found`);
  }

  const updatedPost = Object.assign(post, _.omit(data, ["id", "createdAt"]));

  return await savePost(updatedPost);
};

export const deletePostById = async (id: string) => {
  console.log("Attempting to delete post with ID:", id);
  
  const post = await findPostById(id);
  if (!post) {
    console.error(`Post with ID ${id} not found`);
    throw new Error(`Post not found`);
  }

  console.log("Deleting post:", post);
  return await deletePost(post);
};
