import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-2 overflow-hidden">
          <span className="text-xs font-bold text-pink-600">美</span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-pink-500 text-white shadow-lg' 
            : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-md'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
