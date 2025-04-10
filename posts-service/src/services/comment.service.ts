import { Comment } from "../entities/comment.entity";
import { IUser } from "../models/user.model";
import commentRepository, {
  findComment,
  createComment as saveComment,
  removeComment,
  countCommentsByPostId,
  findAllCommentsByPostId,
} from "../repositories/comment.repository";
import { getUsersByIds } from "./user.service";

export const getAllComments = async (postId: string): Promise<Comment[]> => {
    const comments = await findAllCommentsByPostId(postId);
    const ownerIds = [...new Set(comments.map((comment) => comment.ownerId))]; // unique IDs
        const users = (await getUsersByIds(ownerIds)) as IUser[];
    
        const usersMap = new Map(users.map((user) => [user.id, user]));

 const updatedComments = await Promise.all(
       comments.map(async (comment) => {
         const user = usersMap.get(comment.ownerId);
         const owner = {
           firstName: user?.firstName || "",
           lastName: user?.lastName || "",
           avatar: user?.avatar || null,
         };
 
         return {
           ...comment,
           owner
         };
       })
     );
     return updatedComments;
};

export const addComment = async (
  postId: string,
  ownerId: string,
  text: string
): Promise<Comment> => {
  const newComment = commentRepository.create({ postId, ownerId, text });
  return await saveComment(newComment);
};

export const removeCommentById = async (commentId: string, ownerId: string) => {
  const comment = await commentRepository.findOne({
    where: { id: commentId, ownerId },
  });
  if (!comment) throw new Error("Comment not found or unauthorized");
  return await removeComment(comment);
};

export const getCommentsCount = async (postId: string): Promise<number> => {
  return await countCommentsByPostId(postId);
};

export const deleteCommentsByPostId = async (postId: string) => {
  const comments = await commentRepository.find({ where: { postId } });
  for (const comment of comments) {
    await removeComment(comment);
  }
};
