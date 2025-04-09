import { Repository } from "typeorm";
import { Like } from "../entities/like.entity";
import { PostDataSource } from "../config/typeorm.config";

const likeRepository: Repository<Like> = PostDataSource.getRepository(Like);

export const findLike = async (postId: string, ownerId: string) => {
  return await likeRepository.findOne({ where: { postId, ownerId } });
};

export const createLike = async (like: Like) => {
  return await likeRepository.save(like);
};

export const removeLike = async (like: Like) => {
  return await likeRepository.remove(like);
};

export const countLikesByPostId = async (postId: string) => {
  return await likeRepository.count({ where: { postId } });
};

export default likeRepository;
