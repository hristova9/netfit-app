import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { PostDataSource } from "../config/typeorm.config";

const postRepository: Repository<Post> = PostDataSource.getRepository(Post);

export const findAllPosts = async () =>
  await postRepository.find({ order: { createdAt: "DESC" } });
export const findPostById = async (id: string) =>
  await postRepository.findOne({ where: { id } });
export const findPostsByOwnerId = async (ownerId: string) =>
  await postRepository.find({
    where: { ownerId },
    order: { createdAt: "DESC" },
  });
export const savePost = async (post: Post) => await postRepository.save(post);
export const deletePost = async (post: Post) =>
  await postRepository.remove(post);

export default postRepository;
