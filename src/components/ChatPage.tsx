import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Message, ApiResponse, WELCOME_MESSAGES, AI_PROFILE, DAILY_CONVERSATION_LIMIT, DailyLimit, SubscriptionStatus, SYSTEM_PROMPT } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Heart, Sparkles, Crown, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubscriptionModal } from './SubscriptionModal';

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [{
      role: 'assistant',
      content: WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
    }];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(() => {
    const saved = localStorage.getItem('subscriptionStatus');
    return saved ? JSON.parse(saved) : { isSubscribed: false };
  });
  const [dailyLimit, setDailyLimit] = useState<DailyLimit>(() => {
    const saved = localStorage.getItem('dailyLimit');
    const today = new Date().toISOString().split('T')[0];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        return parsed;
      }
    }
    return { count: 0, date: today };
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('dailyLimit', JSON.stringify(dailyLimit));
  }, [dailyLimit]);

  useEffect(() => {
    localStorage.setItem('subscriptionStatus', JSON.stringify(subscriptionStatus));
  }, [subscriptionStatus]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const checkAndUpdateLimit = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (subscriptionStatus.isSubscribed) return true;
    
    if (dailyLimit.date !== today) {
      setDailyLimit({ count: 1, date: today });
      return true;
    }

    if (dailyLimit.count >= DAILY_CONVERSATION_LIMIT) {
      setShowSubscriptionModal(true);
      return false;
    }

    setDailyLimit(prev => ({
      ...prev,
      count: prev.count + 1
    }));
    return true;
  };

  const sendMessage = async (content: string) => {
    if (!checkAndUpdateLimit()) return;
    setError(null);

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-10);
      const response = await axios.post<ApiResponse>(
        'https://miaoge2024-zhang2025.hf.space/hf/v1/chat/completions',
        {
          model: 'claude-3-5-sonnet',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            userMessage
          ],
          temperature: 0.9,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const assistantMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('网络错误，请稍后重试');
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '呜呜~系统好像出了点小问题呢！让我们休息���下下，待会再聊好吗？(｡•́︿•̀｡)' },
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

  const remainingMessages = subscriptionStatus.isSubscribed 
    ? '无限制' 
    : `今日剩余次数: ${DAILY_CONVERSATION_LIMIT - dailyLimit.count}`;

  return (
    <div className="flex min-h-screen flex-col animated-bg">
      <header className="bg-white/80 backdrop-blur-sm px-6 py-4 shadow sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="text-pink-500" />
            <h1 className="text-xl font-bold text-gray-800">小美的心事室</h1>
            <Sparkles className="text-pink-400" size={20} />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{remainingMessages}</span>
            {!subscriptionStatus.isSubscribed && (
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
              >
                <Crown size={16} />
                升级会员
              </button>
            )}
            <button
              onClick={clearChat}
              className="text-sm px-3 py-1 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
            >
              重新开始聊天
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg z-50">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              timestamp={new Date(Date.now() - (messages.length - index) * 60000)}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-100"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-200"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-6 shadow-lg sticky bottom-0">
        <div className="mx-auto max-w-2xl">
          <ChatInput onSend={sendMessage} disabled={isLoading} maxLength={500} />
        </div>
      </footer>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={() => {}} 
      />
    </div>
  );
}
