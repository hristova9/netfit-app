import React from "react";
import ChatList from "../components/ChatList/ChatList";
import useChats from "../hooks/useChats"; // assuming you saved it here
import "./Chats.css";
import { useNavigate } from "react-router-dom";

const Chats: React.FC = () => {
  const { conversations, loading, error } = useChats();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.toString()}</p>;

  // Default conversations to an empty array if it's null or undefined
  const safeConversations = conversations || [];
  const handleConversationClick = (conversationId: string) => {
    // Navigate to the conversation's page
    navigate(`/chats/${conversationId}`);
  };


  return (
    <div className="chat-page">
      <div className="chat-header-container">
        <h1>Chats Page</h1>
        <p>Your conversations will be shown here.</p>
      </div>
      {safeConversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <ChatList conversations={safeConversations} onConversationClick={handleConversationClick} />
      )}
    </div>
  );
};

export default Chats;
