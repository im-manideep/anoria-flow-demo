'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EmotionEngine } from '@/lib/emotionEngine'

interface SensorsProps {
  emotionEngine: EmotionEngine
}

const SENSORS = [
  { key: 'heartRate', name: 'Heart Rate', unit: 'BPM', color: '#FF3B30', icon: '❤️' },
  { key: 'hrv', name: 'Heart Rate Variability', unit: 'ms', color: '#9933FF', icon: '💜' },
  { key: 'eda', name: 'Skin Conductance', unit: 'µS', color: '#5AC8FA', icon: '💧' },
  { key: 'temperature', name: 'Temperature', unit: '°C', color: '#FF9500', icon: '🌡️' },
  { key: 'audio', name: 'Audio Context', unit: 'dB', color: '#32D74B', icon: '🎵' },
]

export default function Sensors({ emotionEngine }: SensorsProps) {
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
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl font-bold text-white">Live Signals</h1>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
        />
      </motion.div>

      {/* Sensor cards */}
      <div className="space-y-4">
        {SENSORS.map((sensor, i) => {
          const readings = emotionEngine.sensorData.get(sensor.key) || []
          const currentValue = readings[readings.length - 1]?.value || 0

          return (
            <motion.div
              key={sensor.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl p-6 space-y-4"
              style={{ borderColor: sensor.color + '33' }}
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sensor.icon}</span>
                    <h3 className="text-white font-semibold">{sensor.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <motion.span
                      key={currentValue}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold"
                      style={{ color: sensor.color }}
                    >
                      {currentValue.toFixed(sensor.key === 'eda' || sensor.key === 'temperature' ? 1 : 0)}
                    </motion.span>
                    <span className="text-white/60 text-sm">{sensor.unit}</span>
                  </div>
                </div>
              </div>

              {/* Waveform */}
              <div className="h-20 relative">
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id={`grad-${sensor.key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={sensor.color} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={sensor.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {readings.length > 1 && (
                    <>
                      {/* Filled area */}
                      <path
                        d={generatePath(readings, true)}
                        fill={`url(#grad-${sensor.key})`}
                      />
                      {/* Line */}
                      <path
                        d={generatePath(readings, false)}
                        fill="none"
                        stroke={sensor.color}
                        strokeWidth="2"
                      />
                    </>
                  )}
                </svg>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="h-20" />
    </div>
  )
}

function generatePath(readings: any[], filled: boolean) {
  if (readings.length < 2) return ''

  const values = readings.map((r: any) => r.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = readings.map((reading: any, i: number) => {
    const x = (i / (readings.length - 1)) * 100
    const normalized = (reading.value - min) / range
    const y = 100 - normalized * 100
    return { x, y }
  })

  let path = `M ${points[0].x}% ${points[0].y}%`
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x}% ${points[i].y}%`
  }

  if (filled) {
    path += ` L 100% 100% L 0% 100% Z`
  }

  return path
}
