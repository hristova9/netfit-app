import React, { useState } from "react";
import "./PostListItem.styles.css";
import { FaComment, FaPen, FaThumbsUp, FaUser } from "react-icons/fa";
import { Post } from "../../models/Post.model";
import Button from "../Button/Button";

interface PostListItemProps {
  post: Post;
}

// const DEFAULT_AVATAR = "https://via.placeholder.com/150?text=User";

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [likes, setLikes] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments] = useState([]);

  // Handler functions
  const handleLike = () => {
    setLikes(likes + 1);
  };

  //   const handleAddComment = (comment: string) => {
  //     setComments([...comments, comment]);
  //   };
  return (
    <div className="post-list-item">
      <div className="post-list-item-owner">
        <div className="owner-avatar-container">
          {post.ownerAvatar ? (
            <img src={post.ownerAvatar} alt="Avatar" className="owner-avatar" />
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
      <p className="post-description">{post.description}</p>

      {post.photo && (
        <div className="post-image-container">
          <img src={post.photo} alt="Post" className="post-image" />
        </div>
      )}
      <div className="post-actions">
        <button onClick={handleLike} className="like-button">
          <FaThumbsUp />
          {likes}
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
      <button className="edit-post-button">
        <FaPen />
      </button>
    </div>
  );
};
