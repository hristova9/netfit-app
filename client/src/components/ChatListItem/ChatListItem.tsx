import React from "react";
import { Conversation } from "../../models/Conversation.model";
import { FaUser } from "react-icons/fa";
import "./ChatListItem.css";

interface ChatListItemProps {
  conversation: Conversation;
  onConversationClick: (id:string) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ conversation,  onConversationClick}) => {
  return (
    <li className="chat-item-container" onClick={() => onConversationClick(conversation.id)}>
      <div className="participant-avatar-container">
        {conversation.participant.avatar ? (
          <img
            src={conversation.participant.avatar}
            alt="Avatar"
            className="participant-avatar"
          />
        ) : (
          <FaUser className="participant-avatar-icon" />
        )}
      </div>
      <div>
        <h3 className="partisipant-name">
          {conversation.participant.firstName}{" "}
          {conversation.participant.lastName}
        </h3>
        <p className="conversation-date-created">
          {new Date(conversation.createdAt).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
};

export default ChatListItem;
