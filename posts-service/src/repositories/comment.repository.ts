import { Repository } from "typeorm";
import { PostDataSource } from "../config/typeorm.config";
import { Comment } from "../entities/comment.entity";

const commentRepository: Repository<Comment> =
  PostDataSource.getRepository(Comment);

export const findComment = async (postId: string, ownerId: string) => {
  return await commentRepository.findOne({ where: { postId, ownerId } });
};

export const findAllCommentsByPostId = async (postId: string) => {
  return await commentRepository.find({
    where: { postId },
    order: { createdAt: "DESC" },
  });
};

export const createComment = async (comment: Comment) => {
  return await commentRepository.save(comment);
};

export const removeComment = async (comment: Comment) => {
  return await commentRepository.remove(comment);
};

export const countCommentsByPostId = async (postId: string) => {
  return await commentRepository.count({ where: { postId } });
};

export default commentRepository;
