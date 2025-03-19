import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
  channel = await connection.createChannel();
  await channel.assertQueue('user_created');
};

export const publishToQueue = async (queue: string, message: string) => {
  channel.sendToQueue(queue, Buffer.from(message));
};
