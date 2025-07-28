import { MessageStatus } from "@chat/domain/enum/MessageStatus";

export class Message {
  private id: string;
  private content: string;
  senderId: string;
  receiverId: string;
  private status: MessageStatus;
  createAt: Date;
  updateAt: Date;

  constructor(
    id: string,
    content: string,
    senderId: string,
    receiverId: string
  ) {
    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.status = MessageStatus.UNRECEIVED;
    this.createAt = new Date();
    this.updateAt = this.createAt;
  }

  public setStatus(status: MessageStatus) {
    this.status = status;
  }

  public getStatus(): MessageStatus {
    return this.status;
  }

  public getContent(): string {
    return this.content;
  }

  public getId(): string {
    return this.id;
  }
}
