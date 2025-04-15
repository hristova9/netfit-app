import React from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import { Conversation } from "../../models/Conversation.model";
import "./ChatList.css";

interface ChatListProps {
  conversations: Conversation[];
  onConversationClick: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  onConversationClick,
}) => {
  return (
    <div className="chat-list-container">
      <ul className="chat-list">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ChatListItem
              key={conversation.id}
              conversation={conversation}
              onConversationClick={onConversationClick}
            />
          ))
        ) : (
          <p>No conversations found</p>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
