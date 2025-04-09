import { IPost } from "../models/post.model";
import postRepository, {
  findAllPosts,
  findPostById,
  savePost,
  deletePost,
} from "../repositories/post.repository";
import _ from "lodash";
import { deleteLikesByPostId, getLikesCount, hasLiked } from "./like.service";

export const getAllPosts = async (loggedInUserId: string) => {
  try {
    const posts = await findAllPosts();
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const [likesCount, liked] = await Promise.all([
          getLikesCount(post.id),
          hasLiked(post.id, loggedInUserId),
        ]);

        return { ...post, likesCount, hasLiked: liked };
      })
    );

    return updatedPosts;
  } catch (error) {
    throw new Error("Database error: Unable to retrieve posts.");
  }
};

export const getPostById = async (id: string, loggedInUserId: string) => {
  const post = await findPostById(id);
  if (!post) throw new Error("Post not found");

  const [likesCount, liked] = await Promise.all([
    getLikesCount(post.id),
    hasLiked(post.id, loggedInUserId),
  ]);

  return { ...post, likesCount, hasLiked: liked };
};

export const createPost = async (data: IPost): Promise<IPost> => {
  const newPost = postRepository.create(data);
  return await savePost(newPost);
};

export const updatePost = async (id: string, data: Partial<IPost>) => {
  if (!data || !data.ownerId) {
    throw new Error("Invalid data or missing ownerId");
  }

  const post = await getPostById(id, data.ownerId);

  if (!post) {
    throw new Error(`Post not found`);
  }

  const updatedPost = Object.assign(post, _.omit(data, ["id", "createdAt", "likesCount", "hasLiked"]));

  return await savePost(updatedPost);
};

export const deletePostById = async (id: string) => {
  const post = await findPostById(id);

  if (!post) {
    throw new Error(`Post not found`);
  }
  
  await deleteLikesByPostId(id);
  return await deletePost(post);
};
