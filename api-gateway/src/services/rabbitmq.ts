import amqp from 'amqplib';

const rabbitmqUrl = 'amqp://localhost';

export const sendToQueue = async (queueName: string, message: object) => {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  
  await channel.close();
  await connection.close();
};

export const listenToQueue = async <T>(queueName: string): Promise<T> => {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  
  await channel.assertQueue(queueName, { durable: true });
  
  return new Promise<T>((resolve) => {
    channel.consume(queueName, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString()) as T;
        channel.ack(msg);
        resolve(message);
      }
    });
  });
};

