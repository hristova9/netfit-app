import React from "react";
import { Post } from "../../models/Post.model";
import { PostListItem } from "../PostListItem/PostListItem";
import "./PostList.styles.css";

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list-container">
      <ul className="post-list">
        {posts?.length > 0 ? (
          posts.map((post) => <PostListItem key={post.id} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};
