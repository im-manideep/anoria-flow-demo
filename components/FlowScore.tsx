'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

interface FlowScoreProps {
  score: number
}

export default function FlowScore({ score }: FlowScoreProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 1.5,
      ease: "easeOut",
    })
    return controls.stop
  }, [score, count])

  const scoreColor = 
    score > 80 ? '#00FF87' :
    score > 60 ? '#5AC8FA' :
    score > 40 ? '#FFD60A' : '#FF3B30'

  const scoreLabel =
    score > 80 ? 'Excellent' :
    score > 60 ? 'Good' :
    score > 40 ? 'Fair' : 'Needs Attention'

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Circle */}
      <div className="relative w-44 h-44">
        {/* Outer glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: scoreColor }}
        />

        {/* Main circle */}
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at center, ${scoreColor}33, ${scoreColor}11)`,
            border: `2px solid ${scoreColor}44`,
          }}
        >
          {/* Score text */}
          <div className="text-center">
            <motion.div
              className="text-7xl font-bold"
              style={{
                background: `linear-gradient(180deg, white, ${scoreColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {rounded}
            </motion.div>
            <p className="text-xs font-semibold tracking-widest text-white/60 mt-1">
              FLOW SCORE
            </p>
          </div>
        </motion.div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-4 py-2 rounded-full"
        style={{
          backgroundColor: scoreColor + '22',
        }}
      >
        <p
          className="text-sm font-medium"
          style={{ color: scoreColor }}
        >
          {scoreLabel}
        </p>
      </motion.div>
    </div>
  )
}
