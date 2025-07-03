import React from 'react';
import { IMessage } from '../../types/messagesTypes'; // Ajustado para o arquivo de tipos centralizado

interface ChatMessageProps {
  message: IMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, isSender, timestamp, senderName } = message;

  return (
    <div className={`flex mb-3 ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`py-2 px-4 rounded-xl shadow-md max-w-sm md:max-w-md lg:max-w-lg break-words
                    ${isSender ? 'bg-indigo-500 text-white rounded-br-none' 
                                : 'bg-white text-gray-700 rounded-bl-none border border-gray-200'}`}
      >
        {!isSender && (
            <p className="text-xs font-semibold text-indigo-500 mb-1">{senderName}</p>
        )}
        <p className="text-sm">{text}</p>
        <p className={`text-xs mt-1 ${isSender ? 'text-indigo-200' : 'text-gray-400'} text-right`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
