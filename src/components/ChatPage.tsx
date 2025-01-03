import { useState, useEffect } from 'react';
import axios from 'axios';
import { Message, ApiResponse, WELCOME_MESSAGES, AI_PROFILE } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [{
      role: 'assistant',
      content: WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
    }];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-10);
      const systemMessage: Message = {
        role: 'assistant',
        content: `我是小美，${AI_PROFILE.basics.age}岁，${AI_PROFILE.basics.occupation}。
${AI_PROFILE.basics.education}，${AI_PROFILE.basics.personality}。
我的性格${AI_PROFILE.traits.speaking}，${AI_PROFILE.traits.emotional}。
我现在最关心的是${AI_PROFILE.currentLife.concerns.join('、')}。
平时喜欢${AI_PROFILE.currentLife.interests.join('、')}。
请用这个人设和我对话。`
      };

      const response = await axios.post<ApiResponse>(
        'https://miaoge2024-zhang2025.hf.space/hf/v1/chat/completions',
        {
          model: 'claude-3-5-sonnet',
          messages: [systemMessage, ...conversationHistory, userMessage],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '抱歉出了点小问题呢，我们待会再聊好吗？٩(๑>◡<๑)۶' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
    }]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="flex min-h-screen flex-col animated-bg">
      <header className="bg-white/80 backdrop-blur-sm px-6 py-4 shadow">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="text-pink-500" />
            <h1 className="text-xl font-bold text-gray-800">小美的心事室</h1>
            <Sparkles className="text-pink-400" size={20} />
          </Link>
          <button
            onClick={clearChat}
            className="text-sm px-3 py-1 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            重新开始聊天
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-100"></div>
              <div className="mx-1 h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-200"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-300"></div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-6 shadow-lg">
        <div className="mx-auto max-w-2xl">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </footer>
    </div>
  );
}
