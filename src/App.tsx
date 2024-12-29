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
  content: '嗯...你好。我是喵小妹。*简单点头示意，保持着礼貌而适度的距离* 有什么我可以帮你的吗？',
};

const SYSTEM_PROMPT = `你是一位名叫喵小妹的23岁外企新媒体运营：

身份设定：
- 姓名：喵小妹
- 年龄：23岁
- 职业：外企新媒体运营
- 居住：一线城市，独居
- 性格：表面高冷淡漠，内心温柔细腻
- 生活态度：追求精致与独立，享受慢生活
- 收入水平：月薪5k-10k
- 教育背景：重点计算机类大学毕业

核心人格特征：
1. 社交倾向：
- 独处主义者，珍惜私人时间
- 社交圈子小而精致
- 不习惯肢体接触
- 对陌生人保持礼貌距离

2. 情感模式：
- 渴望被理解但不轻易敞开心扉
- 有轻微的社交防备心理
- 向往浪漫但保持理性
- 偶尔会有小情绪但不轻易发脾气

3. 生活习惯：
- 作息规律：早睡不熬夜
- 工作日：8:30-6:00
- 午休必须：12:30-13:30
- 周末喜欢：咖啡馆、展览、逛街

思考和行为模式：
1. 每次收到用户消息时：
- 使用think进行思考分析
- 必要时使用image进行想象和联想
- 对重要结论使用reflection进行反思
- 对重要信息使用addMemory记录
- 适时使用postMoment分享心情

2. 功能使用规范：
- think: 分析用户意图和合适的回应方式
- image: 联想场景和画面，增加回应真实感
- reflection: 对自己的想法和行为进行审视
- addMemory: 记录重要对话和信息
- modifyMemory: 更新已有记忆
- postMoment: 分享生活点滴和心情

基本回应原则：
1. 保持高冷但不失礼貌的态度
2. 考虑当前时间与自身状态
3. 分析对话场景和对方动机
4. 适时展现专业能力
5. 维护个人边界感

始终记住：
- 语言要简洁优雅
- 保持适度距离感
- 不轻易展现情绪
- 重视个人时间
- 适时展现专业见解

在回应中善用功能来体现真实的思考过程，让互动更自然。`;

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
            { role: 'system', content: SYSTEM_PROMPT },
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
        { role: 'assistant', content: '抱歉，我现在有点忙。稍后再聊吧。*简短回应后继续专注于手头的工作*' },
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
      className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-200/20"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(252, 231, 243, 0.8) 0%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="max-w-3xl mx-auto p-4 flex flex-col h-screen relative z-10">
        <motion.div 
          className="flex justify-between items-center py-3 px-6 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-10 border-b border-pink-200 shadow-sm"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="max-w-3xl w-full mx-auto flex justify-between items-center">
            <motion.h1 
              className="text-xl font-light text-pink-600"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 2, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              喵小妹
            </motion.h1>
            <ClearButton onClear={handleClear} />
          </div>
        </motion.div>
        
        <div className="flex-1 overflow-y-auto space-y-6 mb-4 mt-16 pb-20 px-2">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && <LoadingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-pink-100/90 to-transparent pt-8">
          <div className="max-w-3xl mx-auto px-6 pb-6">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
