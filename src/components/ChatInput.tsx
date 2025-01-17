import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="输入消息..."
        className="flex-1 rounded-lg border border-pink-200 px-4 py-2 focus:border-pink-400 focus:outline-none disabled:bg-gray-100 bg-white/80 backdrop-blur-sm"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:bg-gray-400 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
