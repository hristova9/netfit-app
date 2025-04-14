// pages/Conversation.tsx

import React, { useState } from "react";
import useConversation from "../hooks/useConversation"; // Assuming you have the custom hook
import MessagesList from "../components/MessagesList/MessagesList"; // Import MessagesList
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaUser } from "react-icons/fa";
import "./Conversation.css";

const Conversation: React.FC = () => {
  const { conversation, isLoading, error, sendMessage, isSending } =
    useConversation();
  const loggedInUser = useSelector(
    (state: RootState) => state.users.loggedInUser
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  if (isLoading) return <p>Loading conversation...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!loggedInUser) return <p>Please log in to view the conversation.</p>;

  return (
    <div className="conversation-page">
      <div className="conversation-container">
        <div className="conversation-heading">
          <div className="participant-avatar-container">
            {conversation?.participant.avatar ? (
              <img
                src={conversation.participant.avatar}
                alt="Avatar"
                className="participant-avatar"
              />
            ) : (
              <FaUser className="participant-avatar-icon" />
            )}
          </div>
          <h3 className="partisipant-name">
            {conversation?.participant.firstName}{" "}
            {conversation?.participant.lastName}
          </h3>
        </div>

        <MessagesList
          messages={conversation?.messages || []}
          loggedInUserId={loggedInUser.id}
        />

        <form className="message-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <button
            type="submit"
            className="message-send-button"
            disabled={isSending || !newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
