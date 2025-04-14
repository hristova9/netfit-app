import React, { useEffect, useState } from "react";
import useConversation from "../hooks/useConversation";
import MessagesList from "../components/MessagesList/MessagesList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaUser } from "react-icons/fa";
import "./Conversation.css";
import { RxStomp } from "@stomp/rx-stomp";
import { Message } from "../models/Message.model";

const Conversation: React.FC = () => {
  const loggedInUser = useSelector(
    (state: RootState) => state.users.loggedInUser
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");

  const [rxStomp] = useState(new RxStomp());
  const { conversation, isLoading, error, sendMessage } = useConversation({
    rxStomp,
    loggedInUserId: loggedInUser?.id,
  });

  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    const rxStompConfig = {
      brokerURL: "ws://localhost:15674/ws",
      connectHeaders: {
        login: "guest",
        passcode: "guest",
      },
      debug: (msg: any) => {
        // console.log(new Date(), msg);
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 200,
    };

    rxStomp.configure(rxStompConfig);
    rxStomp.activate();

    const senderTopic = `/topic/${loggedInUser?.id}`;

    const senderSubscription = rxStomp
      .watch(senderTopic)
      .subscribe((message) => {
        const messageBody = JSON.parse(message.body);
        console.log("Received message from sender: ", messageBody);
        setMessages((prevMessages) => [...prevMessages, messageBody]);
      });

    return () => {
      senderSubscription.unsubscribe();
      rxStomp.deactivate();
    };
  }, [loggedInUser]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    const newMessageJSON = sendMessage(newMessageText);
    if (newMessageJSON) {
      const newMessage: Message = JSON.parse(newMessageJSON);
      setMessages((prev) => [...prev, newMessage]);
    }
    setNewMessageText("");
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
          messages={messages.length ? messages : []}
          loggedInUserId={loggedInUser.id}
        />

        <form className="message-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            // disabled={isSending}
          />
          <button
            type="submit"
            className="message-send-button"
            // disabled={isSending || !newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
