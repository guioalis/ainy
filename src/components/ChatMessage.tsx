import { Message } from '../types';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center mr-3 shadow-md"
        >
          <span className="text-white font-medium">喵</span>
        </motion.div>
      )}
      <motion.div
        initial={{ scale: 0.8, x: isUser ? 20 : -20 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="leading-relaxed">{message.content}</p>
      </motion.div>
    </motion.div>
  );
}
