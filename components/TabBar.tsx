'use client'

import { motion } from 'framer-motion'

interface Tab {
  id: number
  name: string
  icon: string
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: number
  onTabChange: (id: number) => void
}

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="glass-card rounded-3xl p-2 flex justify-around"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-colors"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-500/20 rounded-2xl"
                />
              )}
              <span className="text-2xl relative z-10">{tab.icon}</span>
              <span
                className={`text-xs font-medium relative z-10 transition-colors ${
                  activeTab === tab.id ? 'text-cyan-400' : 'text-white/60'
                }`}
              >
                {tab.name}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
