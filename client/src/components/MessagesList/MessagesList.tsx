import React from "react";
import { Message } from "../../models/Message.model"; // Assume Message model exists
import { FaUser } from "react-icons/fa"; // For the default avatar
import "./MessagesList.css"; // We'll define styles below

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
        // console.log(message, isOwnMessage);

        return (
          <li
            key={message.id}
            className={`message-item ${
              isOwnMessage ? "own-message" : "other-message"
            }`}
          >
            {/* <div className="message-container"> */}
            {!isOwnMessage && (
              <div className="participant-avatar-container-message">
                {message.sender?.avatar ? (
                  <img
                    src={message.sender.avatar}
                    alt="Avatar"
                    className="participant-avatar"
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
            {isOwnMessage && <div className="avatar"></div>}
            {/* </div> */}
          </li>
        );
      })}
    </ul>
  );
};

export default MessagesList;
