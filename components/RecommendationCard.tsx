'use client'

import { motion } from 'framer-motion'
import { Recommendation } from '@/lib/emotionEngine'

interface RecommendationCardProps {
  recommendation: Recommendation
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-3xl p-6 space-y-4"
      style={{
        borderColor: recommendation.color + '33',
        boxShadow: `0 15px 40px ${recommendation.color}22`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: recommendation.color + '22' }}
        >
          {recommendation.icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">{recommendation.title}</h3>
          <p className="text-white/60 text-sm">Recommendation</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm leading-relaxed">
        {recommendation.description}
      </p>

      {/* Action button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2"
        style={{
          background: `linear-gradient(90deg, ${recommendation.color}, ${recommendation.color}cc)`,
        }}
      >
        {recommendation.action}
        <span>→</span>
      </motion.button>
    </motion.div>
  )
}
