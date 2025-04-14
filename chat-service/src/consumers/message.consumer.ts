import { Client } from "@stomp/stompjs";
import WebSocket from "ws";
import amqp from "amqplib";
import { config } from "../config/config";
import { sendMessage } from "../services/message.service";
import { getUserById } from "../services/user.service";

export const startMessageConsumer = async () => {
  const rabbitmqUrl = config.rabbitmq || "amqp://localhost";
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  const INCOMING_QUEUE = "messages";
  await channel.assertQueue(INCOMING_QUEUE, { durable: true });

  // Create a STOMP client
  const stompClient = new Client({
    brokerURL: "ws://rabbitmq:15674/ws",
    connectHeaders: {
      login: "guest",
      passcode: "guest",
    },
    webSocketFactory: () => new WebSocket("ws://rabbitmq:15674/ws"),
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
  });

  const waitForStompConnection = () =>
    new Promise<void>((resolve, reject) => {
      stompClient.onConnect = () => {
        console.log("Connected to STOMP broker ✅");
        resolve();
      };
      stompClient.onStompError = (frame) => {
        console.error("STOMP Error:", frame);
        reject(new Error(`STOMP Error: ${frame.body}`));
      };
      stompClient.onWebSocketError = (error) => {
        console.error("WebSocket Error:", error);
        reject(error);
      };
      stompClient.onWebSocketClose = (event) => {
        console.error("WebSocket Closed:", event);
        reject(new Error("WebSocket connection closed"));
      };
    });

  stompClient.activate();
  try {
    await waitForStompConnection();
  } catch (err) {
    console.error("Failed to connect to STOMP broker:", err);
    process.exit(1);
  }

  console.log(`Waiting for messages in queue: "${INCOMING_QUEUE}"`);

  channel.consume(INCOMING_QUEUE, async (msg) => {
    if (msg) {
      try {
        const { senderId, recipientId, text, conversationId } = JSON.parse(
          msg.content.toString()
        );

        console.log("📨 Received from queue:", {
          senderId,
          recipientId,
          text,
          conversationId,
        });

        const newMessage = await sendMessage(
          senderId,
          recipientId,
          text,
          conversationId
        );

        const sender = await getUserById(senderId);

        const destination = `/topic/${recipientId}`;

        stompClient.publish({
          destination,
          body: JSON.stringify({
            ...newMessage,
            sender: {
              firstName: sender.firstName,
              lastName: sender.lastName,
              avatar: sender.avatar,
            },
          }),
        });

        channel.ack(msg);
      } catch (err) {
        console.error("❌ Failed to process message:", err);
        channel.nack(msg, false, false);
      }
    }
  });
};
