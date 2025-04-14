import React from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import { Conversation } from "../../models/Conversation.model";
import "./ChatList.css";

interface ChatListProps {
  conversations: Conversation[];
  onConversationClick: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, onConversationClick }) => {
  return (
    <div className="chat-list-container">
      {conversations.length > 0 ? (
        conversations.map((conversation) => <ul className="chat-list">
            <ChatListItem key={conversation.id} conversation={conversation} onConversationClick={onConversationClick}/>
        </ul> )
      ) : (
        <p>No conversations found</p>
      )}
    </div>
  );
};

export default ChatList;
