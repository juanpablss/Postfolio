import React, { useState, useEffect, useRef } from 'react';
import ConversationListItem from '../components/messages/ConversationListItem';
import ChatMessage from '../components/messages/ChatMessage';
import MessageInput from '../components/messages/MessageInput';
import { IConversation, IMessage } from '../types/messagesTypes'; // Importando dos tipos centralizados

// Mock Data (será usado inicialmente)
const mockConversationsData: IConversation[] = [
  {
    id: '1',
    contactName: 'José Cássios',
    avatarUrl: 'cassios.png',
    lastMessage: 'Por favor, não!!!',
    lastMessageTimestamp: '10:35 AM',
    unreadCount: 0,
    messages: [
      { id: 'm1', text: 'Oi, tudo bem?', senderName: 'José Cássios', isSender: false, timestamp: '10:25 AM' },
      { id: 'm2', text: 'Tudo ótimo! E com você?', senderName: 'Eu Mesmo', isSender: true, timestamp: '10:26 AM' },
      { id: 'm3', text: 'Estou bem também. Terminou de fazer a logo?', senderName: 'José Cássios', isSender: false, timestamp: '10:28 AM' },
      { id: 'm4', text: 'Ainda não', senderName: 'Eu Mesmo', isSender: true, timestamp: '10:29 AM' },
      { id: 'm5', text: 'Ok, então eu faço!', senderName: 'José Cássios', isSender: false, timestamp: '10:30 AM' },
      { id: 'm6', text: 'Por favor, não!!!', senderName: 'Eu Mesmo', isSender: true, timestamp: '10:35 AM' },
    ],
  },
  {
    id: '2',
    contactName: 'Loyse Kelly',
    avatarUrl: '',
    lastMessage: 'Projeto quase finalizado.',
    lastMessageTimestamp: 'Ontem',
    unreadCount: 1,
    messages: [
      { id: 'm6', text: 'Como está o projeto?', senderName: 'Eu Mesmo', isSender: true, timestamp: 'Ontem 09:00 AM' },
      { id: 'm7', text: 'Projeto quase finalizado.', senderName: 'Loyse Kelly', isSender: false, timestamp: 'Ontem 09:05 AM' },
    ],
  },
  {
    id: '3',
    contactName: 'AWS',
    avatarUrl: 'aws.png',
    lastMessage: 'Haha, boa!',
    lastMessageTimestamp: 'Terça-feira',
    unreadCount: 5,
    messages: [
       { id: 'm8', text: 'Haha, boa!', senderName: 'Charlie Brown', isSender: false, timestamp: 'Terça-feira 02:30 PM' },
    ],
  },
];


// Componente principal da página de mensagens
const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<IConversation[]>(mockConversationsData);
  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(
    mockConversationsData.length > 0 ? mockConversationsData[0] : null // Seleciona a primeira por padrão
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageToSend: IMessage = {
      id: `msg_${Date.now()}`,
      text: newMessage,
      senderName: 'Eu Mesmo', // Mock: o usuário logado
      isSender: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Adiciona a nova mensagem à conversa selecionada (apenas no estado do front-end)
    setSelectedConversation(prevConv => {
      if (!prevConv) return null;
      const updatedMessages = [...prevConv.messages, messageToSend];
      return { ...prevConv, messages: updatedMessages, lastMessage: newMessage, lastMessageTimestamp: messageToSend.timestamp };
    });
    
    // Atualiza a lista geral de conversas para refletir a última mensagem
    setConversations(prevConvs => 
      prevConvs.map(conv => 
        conv.id === selectedConversation.id 
        ? { ...conv, messages: [...conv.messages, messageToSend], lastMessage: newMessage, lastMessageTimestamp: messageToSend.timestamp }
        : conv
      )
    );

    setNewMessage('');
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);


  return (
    <div className="flex h-screen font-sans antialiased text-gray-800 bg-gray-100">
      {/* Sidebar de Conversas */}
      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Mensagens</h2>
          {/* Futuramente: Input de busca de conversas */}
        </div>
        <div className="flex-grow overflow-y-auto py-2 space-y-1">
          {conversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedConversation?.id === conv.id}
              onSelect={handleSelectConversation}
            />
          ))}
        </div>
      </div>

      {/* Área de Chat Ativo */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Cabeçalho do Chat Ativo */}
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center shadow-sm">
              <img 
                src={selectedConversation.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedConversation.contactName)}&background=random`} 
                alt={selectedConversation.contactName} 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3" 
              />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{selectedConversation.contactName}</h3>
                {/* Futuramente: Status online/offline */}
              </div>
            </div>

            {/* Lista de Mensagens */}
            <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">
              {selectedConversation.messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} /> {/* Para scroll automático */}
            </div>

            {/* Input de Nova Mensagem */}
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            {/* Placeholder Ícone */}
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <h3 className="text-xl font-semibold text-gray-400">Bem-vindo ao seu Chat!</h3>
            <p className="text-gray-400 mt-1">Selecione uma conversa da lista à esquerda para começar a trocar mensagens.</p>
            <p className="text-gray-400 mt-1">Ou inicie uma nova conversa (funcionalidade futura).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
