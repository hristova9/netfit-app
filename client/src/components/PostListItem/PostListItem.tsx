import React, { useState } from "react";
import "./PostListItem.styles.css";
import { FaComment, FaPen, FaTrash, FaUser } from "react-icons/fa";
import { FaThumbsUp as FaThumbsUpSolid } from "react-icons/fa6"; // filled
import { FaRegThumbsUp as FaThumbsUpOutline } from "react-icons/fa6";
import { Post } from "../../models/Post.model";
import Button from "../Button/Button";
import { usePostLike } from "../../hooks/usePostLike";
import { usePostComments } from "../../hooks/usePostComment";
import CommentListItem from "../CommentListItem/CommentListItem";

interface PostListItemProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  currentUserId?: string;
}

export const PostListItem: React.FC<PostListItemProps> = ({
  post,
  onEdit,
  onDelete,
  currentUserId,
}) => {
  const [liked, setLiked] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const { handleLike, handleUnlike } = usePostLike();
  const { text, setText, handleAddComment, handleDeleteComment } =
    usePostComments(post.id);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const toggleLike = async () => {
    if (!post.id) return;
    if (liked) {
      await handleUnlike(post.id);
      setLikesCount((count) => count - 1);
    } else {
      await handleLike(post.id);
      setLikesCount((count) => count + 1);
    }
    setLiked(!liked);
  };

  const toggleComments = async () => {
    if (!commentsVisible) {
      setCommentsVisible(true);
    } else {
      setCommentsVisible(false);
    }
  };

  return (
    <div className="post-list-item">
      <div className="post-list-item-owner">
        <div className="owner-avatar-container">
          {post.owner?.avatar ? (
            <img
              src={post.owner.avatar}
              alt="Avatar"
              className="owner-avatar"
            />
          ) : (
            <FaUser className="owner-avatar-icon" />
          )}
        </div>
        <div>
          <h3 className="owner-name">
            {post.owner?.firstName} {post.owner?.lastName}
          </h3>
          <p className="post-date-created">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="post-content">
        <p className="post-description">{post.description}</p>

        {post.photo && (
          <div className="post-image-container">
            <img src={post.photo} alt="Post" className="post-image" />
          </div>
        )}
      </div>
      <div className="post-bottom-section">
        <div className="post-actions">
          <button onClick={toggleLike} className="like-button">
            {liked ? <FaThumbsUpSolid /> : <FaThumbsUpOutline />}
            {likesCount}
          </button>
          <button className="comment-button" onClick={toggleComments}>
            <FaComment />
            {post.commentsCount}
          </button>
        </div>

        <div className="comments-section">
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              className="comment-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              className="add-comment-button"
              title="Add Comment"
            />
          </form>
          {commentsVisible && (
            <>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <CommentListItem
                    key={comment.id}
                    onDelete={handleDeleteComment}
                    comment={comment}
                    currentUser={currentUserId}
                  />
                ))
              ) : (
                <p>No comments yet! Please add a comment!</p>
              )}
            </>
          )}
        </div>
      </div>

      {currentUserId === post.ownerId && (
        <div className="post-owner-actions">
          <button className="edit-post-button" onClick={() => onEdit?.(post)}>
            <FaPen />
          </button>
          <button
            className="delete-post-button"
            onClick={() => onDelete?.(post.id)}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};
