'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EmotionEngine, Recommendation } from '@/lib/emotionEngine'

interface RecommendationsProps {
  emotionEngine: EmotionEngine
}

const ALL_RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Listen',
    description: 'Weightless by Marconi Union - scientifically proven to reduce anxiety by 65%',
    action: 'Play on Spotify',
    icon: '🎵',
    color: '#1DB954',
  },
  {
    title: 'Breathe',
    description: 'Box Breathing - 4-4-4-4 pattern to restore balance and reduce stress',
    action: 'Start 5 min session',
    icon: '💨',
    color: '#5AC8FA',
  },
  {
    title: 'Move',
    description: 'A 10-minute walk typically boosts your energy by 15 points',
    action: 'Start Walk',
    icon: '🚶',
    color: '#32D74B',
  },
  {
    title: 'Connect',
    description: 'Your friend Sarah usually boosts your mood by 23 points',
    action: 'Send Message',
    icon: '💬',
    color: '#FF9500',
  },
  {
    title: 'Focus Deep',
    description: 'Your concentration is peaking - perfect time for challenging work',
    action: 'Start Focus Session',
    icon: '🧠',
    color: '#9933FF',
  },
  {
    title: 'Meditate',
    description: '10 minutes of mindfulness can improve mood and reduce stress',
    action: 'Begin Meditation',
    icon: '🧘',
    color: '#FF2D55',
  },
]

export default function Recommendations({ emotionEngine }: RecommendationsProps) {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = emotionEngine.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [emotionEngine])

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white">For You</h1>
        <p className="text-white/60 text-sm mt-2">
          Based on your Flow Score ({emotionEngine.flowScore})
        </p>
      </motion.div>

      {/* Recommendations */}
      <div className="space-y-4">
        {ALL_RECOMMENDATIONS.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 space-y-4"
            style={{
              borderColor: rec.color + '33',
              boxShadow: `0 10px 30px ${rec.color}22`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: rec.color + '22' }}
              >
                {rec.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{rec.title}</h3>
                <p className="text-white/60 text-sm">Recommended for you</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed">
              {rec.description}
            </p>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(90deg, ${rec.color}, ${rec.color}cc)`,
              }}
            >
              {rec.action}
              <span>→</span>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="h-20" />
    </div>
  )
}
