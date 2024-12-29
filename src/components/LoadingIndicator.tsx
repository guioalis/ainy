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
            className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-300 to-pink-400"
            animate={{
              y: ["0%", "-100%", "0%"],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
