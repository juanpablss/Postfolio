import React from 'react';
import { IConversation } from '../../types/messagesTypes'; // Ajustado para o arquivo de tipos centralizado

interface ConversationListItemProps {
  conversation: Omit<IConversation, 'messages'>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(conversation.id)}
      className={`p-3 rounded-lg cursor-pointer flex items-center transition-colors duration-150 ease-in-out
                  ${isSelected ? 'bg-indigo-100 shadow-md' : 'bg-gray-50 hover:bg-gray-200'}`}
    >
      <img
        src={conversation.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.contactName)}&background=random`}
        alt={conversation.contactName}
        className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className={`font-semibold truncate ${isSelected ? 'text-indigo-700' : 'text-gray-800'}`}>
            {conversation.contactName}
          </p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <span className="ml-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>
        <p className={`text-sm truncate ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>
          {conversation.lastMessage}
        </p>
        <p className={`text-xs mt-1 ${isSelected ? 'text-indigo-400' : 'text-gray-400'} text-right`}>
          {conversation.lastMessageTimestamp}
        </p>
      </div>
    </div>
  );
};

export default ConversationListItem;
