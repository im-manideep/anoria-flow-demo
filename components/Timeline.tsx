'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EmotionEngine } from '@/lib/emotionEngine'

interface TimelineProps {
  emotionEngine: EmotionEngine
}

export default function Timeline({ emotionEngine }: TimelineProps) {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = emotionEngine.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [emotionEngine])

  const history = emotionEngine.emotionHistory.slice(-24)
  const peakMoment = history.reduce((max, item) => 
    item.emotion.intensity > max.emotion.intensity ? item : max
  , history[0] || { time: Date.now(), emotion: emotionEngine.currentEmotion })

  const lowMoment = history.reduce((min, item) =>
    item.emotion.intensity < min.emotion.intensity ? item : min
  , history[0] || { time: Date.now(), emotion: emotionEngine.currentEmotion })

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white">Emotion Timeline</h1>
      </motion.div>

      {/* Time selector */}
      <div className="flex gap-2">
        {['24H', '7D', '30D'].map((range) => (
          <button
            key={range}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              range === '24H'
                ? 'bg-cyan-500 text-white'
                : 'glass-card text-white/60'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Graph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-3xl p-6 space-y-4"
      >
        <h2 className="text-white/70 font-semibold">Last 24 Hours</h2>
        
        <div className="relative h-48">
          {/* Grid lines */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-white/10"
              style={{ top: `${i * 33.33}%` }}
            />
          ))}

          {/* Line graph */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5AC8FA" />
                <stop offset="50%" stopColor="#9933FF" />
                <stop offset="100%" stopColor="#00FF87" />
              </linearGradient>
            </defs>
            
            {history.length > 1 && (
              <>
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  points={history
                    .map((item, i) => {
                      const x = (i / (history.length - 1)) * 100
                      const y = 100 - item.emotion.intensity
                      return `${x}%,${y}%`
                    })
                    .join(' ')}
                />
                {history.map((item, i) => {
                  const x = (i / (history.length - 1)) * 100
                  const y = 100 - item.emotion.intensity
                  return (
                    <circle
                      key={i}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill={item.emotion.color}
                    />
                  )
                })}
              </>
            )}
          </svg>
        </div>
      </motion.div>

      {/* Peak moments */}
      <div className="space-y-3">
        <PeakCard
          title="Peak Moment"
          time={peakMoment.time}
          emotion={peakMoment.emotion.name}
          color="#00FF87"
          icon="↑"
        />
        <PeakCard
          title="Lowest Point"
          time={lowMoment.time}
          emotion={lowMoment.emotion.name}
          color="#FF3B30"
          icon="↓"
        />
      </div>

      {/* Patterns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <h2 className="text-xl font-bold text-white">Patterns Detected</h2>
        {[
          'Morning energy typically builds after 9 AM',
          'Focus peaks during afternoon (2-4 PM)',
          'Music boosts your mood by ~18%',
          'Movement increases energy by 15 points',
        ].map((pattern, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="text-cyan-400 text-xl">✨</span>
            <p className="text-white/90 text-sm">{pattern}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="h-20" />
    </div>
  )
}

function PeakCard({ title, time, emotion, color, icon }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-2xl p-4 flex items-center gap-4"
      style={{ borderColor: color + '33' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
        style={{ backgroundColor: color + '22', color }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white/70 text-sm">{title}</p>
        <p className="text-white font-bold text-lg">
          {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-sm font-semibold" style={{ color }}>
          {emotion}
        </p>
      </div>
    </motion.div>
  )
}
