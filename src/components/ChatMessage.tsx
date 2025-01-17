import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  timestamp?: Date;
}

export function ChatMessage({ message, timestamp = new Date() }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-2 overflow-hidden">
          <span className="text-xs font-bold text-pink-600">美</span>
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
            isUser 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {formatDistanceToNow(timestamp, { addSuffix: true, locale: zhCN })}
        </span>
      </div>
    </div>
  );
}
