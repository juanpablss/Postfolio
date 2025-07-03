export interface IMessage {
  id: string;
  text: string;
  senderName: string;
  isSender: boolean;
  timestamp: string; 
}

export interface IConversation {
  id: string;
  contactName: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount?: number;
  messages: IMessage[];
}
