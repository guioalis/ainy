import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  maxLength?: number;
}

export function ChatInput({ onSend, disabled, maxLength = 500 }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const charactersLeft = maxLength - input.length;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && input.length <= maxLength) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="输入消息... (按Enter发送，Shift+Enter换行)"
          className="flex-1 rounded-lg border border-pink-200 px-4 py-2 focus:border-pink-400 focus:outline-none disabled:bg-gray-100 bg-white/80 backdrop-blur-sm resize-none min-h-[44px] max-h-[200px]"
          rows={1}
          maxLength={maxLength}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim() || input.length > maxLength}
          className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:bg-gray-400 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
      <div className="flex justify-end">
        <span className={`text-xs ${charactersLeft < 50 ? 'text-red-500' : 'text-gray-500'}`}>
          剩余字数: {charactersLeft}
        </span>
      </div>
    </form>
  );
}
