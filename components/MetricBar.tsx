'use client'

import { motion } from 'framer-motion'

interface MetricBarProps {
  title: string
  value: number
  color: string
  icon: string
}

export default function MetricBar({ title, value, color, icon }: MetricBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-2xl p-5"
      style={{
        borderColor: color + '33',
      }}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          <motion.p
            key={value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
            style={{ color }}
          >
            {Math.round(value)}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}aa)`,
              boxShadow: `0 0 15px ${color}66`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
