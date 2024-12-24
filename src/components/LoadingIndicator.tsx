import { motion } from 'framer-motion';

export function LoadingIndicator() {
  return (
    <div className="flex justify-start my-4 ml-14">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full bg-pink-400"
            animate={{
              y: ["0%", "-50%", "0%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
