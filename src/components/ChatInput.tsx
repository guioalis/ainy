import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex gap-3"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="和喵哥聊天..."
        className="flex-1 rounded-full px-6 py-3 border border-gray-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-white/95 backdrop-blur-sm shadow-md transition-all text-base"
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.button
        type="submit"
        disabled={disabled || !input.trim()}
        className="rounded-full p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Send size={24} />
      </motion.button>
    </motion.form>
  );
}
