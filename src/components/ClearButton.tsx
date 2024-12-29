import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClearButtonProps {
  onClear: () => void;
}

export function ClearButton({ onClear }: ClearButtonProps) {
  const handleClear = () => {
    if (window.confirm('确定要清空所有对话记录吗？')) {
      onClear();
    }
  };

  return (
    <motion.button
      onClick={handleClear}
      className="flex items-center gap-2 px-4 py-2 text-xs text-pink-500 hover:bg-pink-50 rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Trash2 size={16} />
      清空对话
    </motion.button>
  );
}
