import React from "react";
import { Message } from "../../models/Message.model"; 
import { FaUser } from "react-icons/fa"; 
import "./MessagesList.css";

interface MessagesListProps {
  messages: Message[];
  loggedInUserId: string;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  loggedInUserId,
}) => {
  return (
    <ul className="messages-list">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === loggedInUserId;

        return (
          <li
            key={message.id}
            className={`message-item ${
              isOwnMessage ? "own-message" : "other-message"
            }`}
          >
            {!isOwnMessage && (
              <div className="participant-avatar-container-message">
                {message.sender?.avatar ? (
                  <img
                    src={message.sender.avatar}
                    alt="Avatar"
                    className="participant-avatar-message"
                  />
                ) : (
                  <FaUser className="participant-avatar-icon" />
                )}
              </div>
            )}
            <div className="message-content">
              <p
                className={`message-text ${
                  isOwnMessage ? "own-text" : "other-text"
                }`}
              >
                {message.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MessagesList;
