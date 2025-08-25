"use client";

import { motion } from 'framer-motion';
import { Snowflake, Wind, Zap } from 'lucide-react';

export default function Logo() {
  return (
    <motion.div 
      className="flex items-center space-x-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated AC Unit Icon */}
      <motion.div 
        className="relative"
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-10 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg relative overflow-hidden shadow-lg">
          {/* AC Vents */}
          <div className="absolute inset-x-1 top-1 space-y-0.5">
            <div className="h-0.5 bg-white/60 rounded"></div>
            <div className="h-0.5 bg-white/60 rounded"></div>
            <div className="h-0.5 bg-white/60 rounded"></div>
          </div>
          
          {/* Cooling Effect */}
          <motion.div
            className="absolute -right-2 top-1/2 transform -translate-y-1/2"
            animate={{
              x: [0, 15, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Wind className="w-4 h-4 text-sky-200" />
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Snowflakes */}
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 8}px`,
              top: `${i * 4}px`
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <Snowflake className="w-3 h-3 text-sky-300" />
          </motion.div>
        ))}
      </div>

      {/* Company Name with Typing Animation */}
      <div className="flex flex-col">
        <motion.div 
          className="text-xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
          >
            K
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3 }}
          >
            o
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.4 }}
          >
            o
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.5 }}
          >
            l
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.6 }}
          >
            i
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.7 }}
          >
            n
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.8 }}
          >
            g
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.9 }}
          >
            K
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.0 }}
          >
            u
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.1 }}
          >
            l
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.2 }}
          >
            t
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.3 }}
          >
            u
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.4 }}
          >
            r
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.5 }}
          >
            e
          </motion.span>
        </motion.div>
        
        {/* Subtitle with fade-in */}
        <motion.div 
          className="text-xs text-gray-500 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Cooling Solutions</span>
          </span>
        </motion.div>
      </div>

      {/* Pulsing Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-600/20 rounded-lg blur-xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}