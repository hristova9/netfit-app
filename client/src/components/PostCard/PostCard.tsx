import React, { useState } from "react";
import "./PostCard.styles.css";
import { FaComment, FaThumbsUp } from "react-icons/fa";

interface PostCardProps {
  name: string;
  avatar: string;
  dateCreated: string;
  title?: string;
  description: string;
  image?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  name,
  title,
  avatar,
  image,
  dateCreated,
  description,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  // Handler functions
  const handleLike = () => {
    setLikes(likes + 1);
  };

//   const handleAddComment = (comment: string) => {
//     setComments([...comments, comment]);
//   };
  return (
    <div className="post-card">
      {/* Post Owner Info */}
      <div className="post-card-owner">
        <img src={avatar} alt="User Avatar" className="owner-avatar" />
        <div>
          <h3 className="owner-name">{name}</h3>
          <p className="post-date-created">{dateCreated}</p>
        </div>
      </div>

      {/* Title (if exists) */}
      {title && <h2 className="post-title">{title}</h2>}

      {/* Picture (if exists) */}
      {image && (
        <div className="post-image-container">
          <img src={image} alt="Post" className="post-image" />
        </div>
      )}

      {/* Description */}
      <p className="post-description">{description}</p>
      {/* Like and Comment Buttons */}
      <div className="post-actions">
        <button onClick={handleLike} className="like-button">
          <FaThumbsUp />Likes ({likes})
        </button>
        <button className="comment-button"><FaComment />Comments ({comments.length})</button>
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
          <button type="submit" className="submit-comment-button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
