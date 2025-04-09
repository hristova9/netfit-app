import { Like } from "../entities/like.entity";
import likeRepository, {
  findLike,
  createLike as saveLike,
  removeLike,
  countLikesByPostId,
} from "../repositories/like.repository";

export const addLike = async (
  postId: string,
  ownerId: string
): Promise<Like> => {
  const existing = await findLike(postId, ownerId);
  if (existing) throw new Error("You already liked this post");

  const newLike = likeRepository.create({ postId, ownerId });
  return await saveLike(newLike);
};

export const removeLikeByOwner = async (postId: string, ownerId: string) => {
  const like = await findLike(postId, ownerId);
  if (!like) throw new Error("Like not found");
  return await removeLike(like);
};

export const hasLiked = async (
  postId: string,
  ownerId: string
): Promise<boolean> => {
  const like = await findLike(postId, ownerId);
  return !!like;
};

export const getLikesCount = async (postId: string): Promise<number> => {
  return await countLikesByPostId(postId);
};

export const deleteLikesByPostId = async (postId: string) => {
  const likes = await likeRepository.find({ where: { postId } });
  for (const like of likes) {
    await removeLike(like);
  }
};
