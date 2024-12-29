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
        damping: 20,
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center mr-3 shadow-md cursor-pointer"
        >
          <span className="text-white font-light text-xs">喵小妹</span>
        </motion.div>
      )}
      <motion.div
        initial={{ scale: 0.8, x: isUser ? 20 : -20 }}
        animate={{ scale: 1, x: 0 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow ${
          isUser
            ? 'bg-gradient-to-br from-pink-300 to-rose-400 text-white rounded-br-none'
            : 'bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-none'
        }`}
      >
        <motion.p 
          className="leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
