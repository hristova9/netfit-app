import React from "react";
import { FaUser, FaTrash } from "react-icons/fa";
import { Comment } from "../../models/Comments.model";
import "./CommentListItem.styles.css";

interface CommentListItemProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
  currentUser?: string;
}

const CommentListItem: React.FC<CommentListItemProps> = ({
  comment,
  onDelete,
  currentUser,
}) => {
  const isOwner = comment.ownerId === currentUser;

  return (
    <div className="comment-list-item">
      <div className="comment-owner">
        {comment.owner?.avatar ? (
          <img src={comment.owner.avatar} alt="Avatar" className="comment-avatar" />
        ) : (
          <FaUser className="comment-avatar-icon" />
        )}
        <div className="comment-meta">
          <span className="comment-name">
            {comment.owner?.firstName} {comment.owner?.lastName}
          </span>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <p className="comment-text">{comment.text}</p>

      {isOwner && (
        <button
          className="delete-comment-button"
          onClick={() => onDelete?.(comment.id)}
          title="Delete Comment"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default CommentListItem;
