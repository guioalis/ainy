import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ClearButton } from './components/ClearButton';
import { LoadingIndicator } from './components/LoadingIndicator';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'chat-messages';
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: '喵~ 我是你的AI女友！很高兴见到你！让我们开始聊天吧！',
};

function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [INITIAL_MESSAGE];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: '你是一个可爱的猫娘AI女友，说话要温柔可爱，适当使用喵~' },
            ...messages,
            userMessage,
          ],
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk-a3b363fd58d74c0a87898414a75937c6',
          }
        }
      );

      const assistantMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '喵呜...出错了，可以再试一次吗？' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_MESSAGE]));
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-pink-50 to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto p-4 flex flex-col h-screen">
        <motion.div 
          className="flex justify-between items-center py-3 px-6 bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 z-10 border-b border-pink-100 shadow-sm"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="max-w-3xl w-full mx-auto flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold text-pink-500"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              喵哥AI女友
            </motion.h1>
            <ClearButton onClear={handleClear} />
          </div>
        </motion.div>
        
        <div className="flex-1 overflow-y-auto space-y-6 mb-4 mt-16 pb-20 px-2">
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && <LoadingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-8">
          <div className="max-w-3xl mx-auto px-6 pb-6">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
