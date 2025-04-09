import React, { useState } from "react";
import "./PostListItem.styles.css";
import { FaComment, FaPen, FaTrash, FaUser } from "react-icons/fa";
import { FaThumbsUp as FaThumbsUpSolid } from "react-icons/fa6"; // filled
import { FaRegThumbsUp as FaThumbsUpOutline } from "react-icons/fa6";
import { Post } from "../../models/Post.model";
import Button from "../Button/Button";
import { usePostLike } from "../../hooks/usePostLike";

interface PostListItemProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  currentUserId?: string;
}

// const DEFAULT_AVATAR = "https://via.placeholder.com/150?text=User";

export const PostListItem: React.FC<PostListItemProps> = ({
  post,
  onEdit,
  onDelete,
  currentUserId,
}) => {
  const [liked, setLiked] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0); // assuming `post.likes` is an array
  const { handleLike, handleUnlike } = usePostLike();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments] = useState([]);

  
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
  //   const handleAddComment = (comment: string) => {
  //     setComments([...comments, comment]);
  //   };
  return (
    <div className="post-list-item">
      <div className="post-list-item-owner">
          <div className="owner-avatar-container">
            {post.ownerAvatar ? (
              <img
                src={post.ownerAvatar}
                alt="Avatar"
                className="owner-avatar"
              />
            ) : (
              <FaUser className="owner-avatar-icon" />
            )}
          </div>
          <div>
            <h3 className="owner-name">
              {post.ownerFirstName} {post.ownerLastName}
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
        <button className="comment-button">
          <FaComment />
          {comments.length}
        </button>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        {comments.map((comment, index) => (
          <p key={index} className="comment">
            {comment}
          </p>
        ))}
        {/* Add Comment Form */}
        <form
          className="comment-form"
          //   onSubmit={(e) => {
          //     e.preventDefault();
          //     const comment = e.target.elements.comment.value;
          //     if (comment) {
          //       handleAddComment(comment);
          //       e.target.reset();
          //     }
          //   }}
        >
          <input
            type="text"
            name="comment"
            placeholder="Add a comment..."
            className="comment-input"
          />
          <Button
            type="submit"
            className="add-comment-button"
            title="Add Comment"
          />
        </form>
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
