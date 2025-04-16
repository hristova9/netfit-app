import { IPost } from "../models/post.model";
import postRepository, {
  findAllPosts,
  findPostById,
  savePost,
  deletePost,
  findPostsByOwnerId,
} from "../repositories/post.repository";
import _ from "lodash";
import { deleteLikesByPostId, getLikesCount, hasLiked } from "./like.service";
import { getUserById, getUsersByIds } from "./user.service";
import { IUser } from "../models/user.model";
import {
  deleteCommentsByPostId,
  getAllComments,
  getCommentsCount,
} from "./comment.service";

export const getAllPosts = async (loggedInUserId: string) => {
  try {
    const posts = await findAllPosts();

    const ownerIds = [...new Set(posts.map((post) => post.ownerId))];
    const users = (await getUsersByIds(ownerIds)) as IUser[];

    const usersMap = new Map(users.map((user) => [user.id, user]));

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const [likesCount, liked, commentsCount] = await Promise.all([
          getLikesCount(post.id),
          hasLiked(post.id, loggedInUserId),
          getCommentsCount(post.id),
        ]);

        const user = usersMap.get(post.ownerId);
        const owner = {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          avatar: user?.avatar || null,
        };

        const comments = await getAllComments(post.id);

        return {
          ...post,
          likesCount,
          commentsCount,
          hasLiked: liked,
          owner,
          comments: comments,
        };
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

  const [likesCount, liked, commentsCount] = await Promise.all([
    getLikesCount(post.id),
    hasLiked(post.id, loggedInUserId),
    getCommentsCount(post.id),
  ]);

  const user = await getUserById(post.ownerId);

  const owner = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    avatar: user?.avatar || null,
  };

  return {
    ...post,
    likesCount,
    commentsCount,
    hasLiked: liked,
    owner,
  };
};

export const getPostsByUserId = async (
  userId: string,
  loggedInUserId: string
) => {
  try {
    const posts = await findPostsByOwnerId(userId);

    const user = await getUserById(userId);
    const owner = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      avatar: user?.avatar || null,
    };

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const [likesCount, liked, commentsCount] = await Promise.all([
          getLikesCount(post.id),
          hasLiked(post.id, loggedInUserId),
          getCommentsCount(post.id),
        ]);

        const comments = await getAllComments(post.id);

        return {
          ...post,
          likesCount,
          commentsCount,
          hasLiked: liked,
          owner,
          comments,
        };
      })
    );

    return updatedPosts;
  } catch (error) {
    throw new Error("Database error: Unable to retrieve posts for this user.");
  }
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

  const updatedPost = Object.assign(
    post,
    _.omit(data, ["id", "createdAt", "likesCount", "hasLiked"])
  );

  return await savePost(updatedPost);
};

export const deletePostById = async (id: string) => {
  const post = await findPostById(id);

  if (!post) {
    throw new Error(`Post not found`);
  }

  await deleteLikesByPostId(id);
  await deleteCommentsByPostId(id);
  return await deletePost(post);
};
