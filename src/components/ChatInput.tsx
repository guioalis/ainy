import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
      className="flex gap-3 relative"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="flex-1 relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder="发送消息..."
          className="w-full rounded-full px-6 py-3 border border-pink-200 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 bg-white/90 backdrop-blur-sm shadow-md transition-all text-sm"
        />
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 blur-lg"
            />
          )}
        </AnimatePresence>
      </motion.div>
      <motion.button
        type="submit"
        disabled={disabled || !input.trim()}
        className="rounded-full p-3 bg-gradient-to-r from-pink-300 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-300"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ opacity: 0.5 }}
        />
        <Send size={20} className="relative z-10" />
      </motion.button>
    </motion.form>
  );
}
