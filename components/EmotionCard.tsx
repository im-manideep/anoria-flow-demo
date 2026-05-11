'use client'

import { motion } from 'framer-motion'
import { EmotionState } from '@/lib/emotionEngine'

interface EmotionCardProps {
  emotion: EmotionState
}

export default function EmotionCard({ emotion }: EmotionCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass-card rounded-[32px] p-8 relative overflow-hidden"
        style={{
          borderColor: emotion.color + '33',
          boxShadow: `0 20px 60px ${emotion.color}33`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${emotion.gradientFrom}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Label with shimmer */}
          <div className="relative overflow-hidden">
            <motion.h2
              className="text-base font-bold tracking-wider text-white/90"
            >
              EMOTION: {emotion.name}
            </motion.h2>
            
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: [-200, 400],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-24"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
          </div>

          {/* Progress bar with particles */}
          <div className="relative">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emotion.intensity}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${emotion.gradientFrom}, ${emotion.gradientTo})`,
                  boxShadow: `0 0 20px ${emotion.color}`,
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-60 blur-md"
                  style={{
                    background: `linear-gradient(90deg, ${emotion.gradientFrom}, ${emotion.gradientTo})`,
                  }}
                />
              </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, emotion.intensity * 3, emotion.intensity * 3 + 50],
                  y: [0, -20, 0, 20, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="absolute top-1/2 left-0 w-1 h-1 rounded-full"
                style={{
                  backgroundColor: emotion.color,
                }}
              />
            ))}
          </div>

          {/* Percentage */}
          <motion.p
            key={emotion.intensity}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-center"
            style={{ color: emotion.color }}
          >
            {Math.round(emotion.intensity)}%
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}
