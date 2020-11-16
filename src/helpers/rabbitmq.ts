import { connect, Connection, ConsumeMessage, Replies } from "amqplib";
import { Model } from "sequelize-typescript";

interface getMessagesOptions {
  limit: number
  queue?: string
  convertToObject?: false
}

interface getMessagesObjectOptions extends Omit<getMessagesOptions, "convertToObject"> {
  convertToObject: true
}

/**
 * @description RabbitMQ helpers. You have to execute init function in order to make
 */
export class SPRabbitMQ {
  defaultQueue = "stats-users";
  rabbit: Connection | undefined;
  rabbitChannel;
  readonly #rabbitConnection: Promise<Connection>;

  constructor(connectionString: string, defaultQueue?: string) {
    this.#rabbitConnection = connect(connectionString);
    if (defaultQueue) this.defaultQueue = defaultQueue;
  }

  get isReady(): boolean {
    return !!this.rabbit;
  }

  async init() {
    this.rabbit = await this.#rabbitConnection;
  }

  sendMessage<T extends Record<string, any> | string>(message: T, queue?: string): Promise<void> {
    return this.sendMessages<T>([message], queue);
  }

  async sendMessages<T extends Record<string, any> | string>(messages: { 0: T } & T[], queue?: string): Promise<void> {
    this.checkIfReady();
    const channel = await this.rabbit?.createChannel();
    if (!channel) throw new Error("Failed to create RabbitMQ channel");
    let stringMessages: string[];

    await channel.assertQueue(queue || this.defaultQueue);

    if (typeof messages[0] === "object") {
      stringMessages = messages.map(message => JSON.stringify(message instanceof Model ? message.toJSON() : message));
    }
    else {
      stringMessages = messages as string[];
    }

    const limit = 500;

    for (let i = 0; i < stringMessages.length; i += limit) {
      await Promise.all(stringMessages.map(message => channel.sendToQueue(queue || this.defaultQueue, Buffer.from(message))));
    }

    await channel.close();
  }

  async getMessages<T extends Record<string, any> | string>(options: T extends string
    ? getMessagesOptions
    : getMessagesObjectOptions): Promise<T[]> {
    this.checkIfReady();
    const channel = await this.rabbit?.createChannel();
    if (!channel) throw new Error("Failed to create RabbitMQ channel");

    await channel.assertQueue(options.queue || this.defaultQueue);

    await channel.prefetch(options.limit, false);
    const messages: ConsumeMessage[] = [];

    await channel.consume(options.queue || this.defaultQueue, (message) => {
      if (message) messages.push(message);
    });

    const convertedMessages: T[] = [];

    for (const message of messages) {
      const convertedMessage = message.content.toString();
      if (options.convertToObject) convertedMessages.push(JSON.parse(convertedMessage));
      else convertedMessages.push(convertedMessage as T);
    }

    await Promise.all(messages.map(message => channel.ack(message, false)));

    await channel.close();

    return convertedMessages;
  }

  async getQueueSize(queue?: string): Promise<Replies.AssertQueue["messageCount"]> {
    this.checkIfReady();
    const channel = await this.rabbit?.createChannel();
    if (!channel) throw new Error("Failed to create RabbitMQ channel");

    const assert = await channel.assertQueue(queue || this.defaultQueue);

    await channel.close();

    return assert.messageCount;
  }

  private checkIfReady(): true {
    if (!!this.rabbit) return true;
    throw new Error("You have to call init function before making any of RabbitMQ actions");
  }
}
