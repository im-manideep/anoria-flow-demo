'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EmotionEngine } from '@/lib/emotionEngine'
import EmotionCard from './EmotionCard'
import FlowScore from './FlowScore'
import MetricBar from './MetricBar'
import RecommendationCard from './RecommendationCard'

interface DashboardProps {
  emotionEngine: EmotionEngine
}

export default function Dashboard({ emotionEngine }: DashboardProps) {
  const [, forceUpdate] = useState({})

useEffect(() => {
  const unsubscribe = emotionEngine.subscribe(() => {
    forceUpdate({})
  })
  return () => unsubscribe()
}, [emotionEngine])
  

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <p className="text-white/70 text-sm font-medium">Flow Score</p>
          <h1 className="text-3xl font-bold text-white mt-1">Real-time EQ</h1>
        </div>
        
        {/* Connection status */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass-card rounded-full px-4 py-2 flex items-center gap-2"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
          <span className="text-white/80 text-sm font-medium">Connected</span>
          <span className="text-2xl">⌚</span>
        </motion.div>
      </motion.div>

      {/* Emotion Card */}
      <EmotionCard emotion={emotionEngine.currentEmotion} />

      {/* Flow Score */}
      <FlowScore score={emotionEngine.flowScore} />

      {/* Metrics */}
      <div className="space-y-4">
        <MetricBar
          title="Energy"
          value={emotionEngine.energy}
          color="#32D74B"
          icon="⚡"
        />
        <MetricBar
          title="Mood"
          value={emotionEngine.mood}
          color="#5AC8FA"
          icon="😊"
        />
        <MetricBar
          title="Focus"
          value={emotionEngine.focus}
          color="#9933FF"
          icon="🎯"
        />
      </div>

      {/* Recommendation */}
      <RecommendationCard recommendation={emotionEngine.currentRecommendation} />

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <button className="text-cyan-400 text-sm font-medium flex items-center gap-1">
            View All <span>→</span>
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {emotionEngine.emotionHistory.slice(-10).reverse().map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-3 flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px]"
              style={{
                borderColor: item.emotion.color + '33',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.emotion.color }}
              />
              <p className="text-white/70 text-xs">
                {new Date(item.time).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: item.emotion.color }}
              >
                {item.emotion.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}
