import React from "react";
import { Post } from "../../models/Post.model";
import { PostListItem } from "../PostListItem/PostListItem";
import "./PostList.styles.css";

interface PostListProps {
  posts: Post[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  currentUserId: string | undefined;
}

export const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete, currentUserId }) => {
  return (
    <div className="post-list-container">
      <ul className="post-list">
        {posts?.length > 0 ? (
          posts.map((post) => <PostListItem key={post.id} post={post} onEdit={onEdit} currentUserId={currentUserId} onDelete={onDelete} />)
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};
