import React, { useEffect, useRef, useState } from "react";
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
  //   const [typing, setTyping] = useState<boolean>(false);

  const [rxStomp] = useState(new RxStomp());
  const { conversation, isLoading, error, sendMessage } = useConversation({
    rxStomp,
    loggedInUserId: loggedInUser?.id,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const rxStompConfig = {
      brokerURL: "ws://localhost:15674/ws",
      connectHeaders: {
        login: "guest",
        passcode: "guest",
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

        // if (
        //   messageBody.type === "typing" &&
        //   messageBody.senderId !== loggedInUser?.id
        // ) {
        //   setTyping(true);
        //   setTimeout(() => setTyping(false), 1500); // Hide typing after 1.5s
        // }
      });

    return () => {
      senderSubscription.unsubscribe();
      rxStomp.deactivate();
    };
  }, [loggedInUser]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    const newMessage = await sendMessage(newMessageText, "text");
    console.log(newMessage);

    if (newMessage && newMessage.senderId && newMessage.recipientId) {
      const messageToAdd: Message = {
        senderId: newMessage.senderId,
        recipientId: newMessage.recipientId,
        text: newMessage.text,
        conversationId: newMessage.conversationId,
      };
      setMessages((prev) => [...prev, messageToAdd]);
      setNewMessageText("");
    } else {
      console.error("Invalid message format:", newMessage);
      setNewMessageText("");
    }
  };

  //   let typingTimeout: NodeJS.Timeout;

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNewMessageText(e.target.value);

  //     if (!typing) {
  //       // Send "typing" event to the server
  //       sendMessage("", "typing"); // Send a "typing" event without a message
  //       setTyping(true);
  //     }

  //     // Clear the typing indicator after 1.5 seconds of inactivity
  //     clearTimeout(typingTimeout);
  //     typingTimeout = setTimeout(() => {
  //       setTyping(false);
  //       sendMessage("", "text"); // You could send a "stop typing" event if necessary
  //     }, 1500);
  //     // setNewMessageText("");
  //   };

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
        <div ref={messagesEndRef} />
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
