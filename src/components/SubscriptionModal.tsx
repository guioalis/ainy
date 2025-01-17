import { Crown, X } from 'lucide-react';
import { SUBSCRIPTION_PRICE, SUBSCRIPTION_LINK } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const handleSubscribeClick = () => {
    window.location.href = SUBSCRIPTION_LINK;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <Crown className="mx-auto mb-4 text-yellow-400" size={48} />
          <h2 className="mb-2 text-2xl font-bold text-gray-800">升级到会员</h2>
          <p className="mb-6 text-gray-600">
            解锁无限对话，享受更好的聊天体验
          </p>

          <div className="mb-6 rounded-lg bg-pink-50 p-4">
            <div className="mb-2 text-3xl font-bold text-pink-600">€{SUBSCRIPTION_PRICE}<span className="text-sm">/月</span></div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ 无限次数对话</li>
              <li>✓ 优先响应</li>
              <li>✓ 更多聊天主题</li>
            </ul>
          </div>

          <button
            onClick={handleSubscribeClick}
            className="w-full rounded-lg bg-pink-500 py-3 font-semibold text-white hover:bg-pink-600 transition-colors"
          >
            立即订阅
          </button>
          <p className="mt-4 text-xs text-gray-500">
            订阅后即可享受完整服务，可随时取消
          </p>
        </div>
      </div>
    </div>
  );
}
