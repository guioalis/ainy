import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Sparkles, Coffee, Music, BookOpen } from 'lucide-react';
import { AI_PROFILE } from '../types';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animated-bg">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-pink-500" size={28} />
              <h1 className="text-4xl font-bold text-gray-800">小美的心事室</h1>
              <Sparkles className="text-pink-400" size={28} />
            </div>
            <p className="text-lg text-gray-600">一个温暖的倾诉空间，让我们成为知心好友吧～</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="bg-pink-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Coffee className="text-pink-500" /> 关于我
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  大家好，我是{AI_PROFILE.basics.age}岁的小美！{AI_PROFILE.basics.education}，现在是一名{AI_PROFILE.basics.occupation}。
                  {AI_PROFILE.basics.personality}，{AI_PROFILE.traits.emotional}。
                </p>
              </div>
              
              <div className="bg-pink-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Music className="text-pink-500" /> 我的兴趣
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  平时超爱{AI_PROFILE.currentLife.interests.join('、')}。
                  {AI_PROFILE.traits.speaking}
                </p>
              </div>

              <div className="bg-pink-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="text-pink-500" /> 最近的生活
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  刚来北京工作不久，正在经历{AI_PROFILE.currentLife.concerns[0]}和{AI_PROFILE.currentLife.concerns[2]}。
                  希望能和你分享我的故事，也听听你的经历！
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-pink-50 rounded-xl p-8">
              <div className="w-32 h-32 rounded-full bg-pink-200 flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-pink-600">美</span>
              </div>
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">要一起聊天吗？</h2>
                  <p className="text-gray-600">
                    期待听到你的故事！让我们互相分享、互相理解～
                  </p>
                </div>
                <button
                  onClick={() => navigate('/chat')}
                  className="inline-flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors shadow-lg"
                >
                  <MessageCircle size={24} />
                  开始聊天
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
