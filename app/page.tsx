'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Dashboard from '@/components/Dashboard'
import Timeline from '@/components/Timeline'
import Sensors from '@/components/Sensors'
import Recommendations from '@/components/Recommendations'
import TabBar from '@/components/TabBar'
import { EmotionEngine } from '@/lib/emotionEngine'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [emotionEngine] = useState(() => new EmotionEngine())

  useEffect(() => {
    emotionEngine.start()
    return () => emotionEngine.stop()
  }, [emotionEngine])

  const tabs = [
    { id: 0, name: 'Flow', icon: '❤️', component: Dashboard },
    { id: 1, name: 'Timeline', icon: '📈', component: Timeline },
    { id: 2, name: 'Sensors', icon: '🌊', component: Sensors },
    { id: 3, name: 'For You', icon: '✨', component: Recommendations },
  ]

  const ActiveComponent = tabs[activeTab].component

  return (
    <main className="min-h-screen pb-24">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0F1429] animate-pulse-slow" />
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent emotionEngine={emotionEngine} />
        </motion.div>
      </AnimatePresence>

      {/* Tab bar */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
