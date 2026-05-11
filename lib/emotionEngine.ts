export interface EmotionState {
  name: string
  intensity: number
  color: string
  gradientFrom: string
  gradientTo: string
  description: string
}

export interface SensorReading {
  timestamp: number
  value: number
}

export interface Recommendation {
  title: string
  description: string
  action: string
  icon: string
  color: string
}

export class EmotionEngine {
  private listeners: Set<() => void> = new Set()
  private interval: NodeJS.Timeout | null = null
  
  public currentEmotion: EmotionState = this.emotions.radiating
  public flowScore: number = 82
  public energy: number = 76
  public mood: number = 85
  public focus: number = 78
  public sensorData: Map<string, SensorReading[]> = new Map()
  public emotionHistory: Array<{ time: number; emotion: EmotionState }> = []
  public currentRecommendation: Recommendation

  constructor() {
    this.currentRecommendation = this.getRecommendation()
    this.initializeSensorData()
  }

  private get emotions() {
    return {
      radiating: {
        name: 'RADIATING',
        intensity: 85,
        color: '#00FF87',
        gradientFrom: '#00FF87',
        gradientTo: '#00D9FF',
        description: 'Energy flowing freely',
      },
      focused: {
        name: 'FOCUSED',
        intensity: 78,
        color: '#0066FF',
        gradientFrom: '#0066FF',
        gradientTo: '#9933FF',
        description: 'Deep concentration mode',
      },
      scattered: {
        name: 'SCATTERED',
        intensity: 35,
        color: '#FF3B30',
        gradientFrom: '#FF3B30',
        gradientTo: '#FF9500',
        description: 'Energy fragmented',
      },
      calm: {
        name: 'CALM',
        intensity: 65,
        color: '#007AFF',
        gradientFrom: '#007AFF',
        gradientTo: '#5AC8FA',
        description: 'Peaceful and centered',
      },
      energized: {
        name: 'ENERGIZED',
        intensity: 92,
        color: '#FFD60A',
        gradientFrom: '#FFD60A',
        gradientTo: '#32D74B',
        description: 'High vitality',
      },
    }
  }

  private initializeSensorData() {
    const sensors = ['heartRate', 'hrv', 'eda', 'temperature', 'audio']
    const now = Date.now()
    
    sensors.forEach(sensor => {
      const data: SensorReading[] = []
      for (let i = 50; i >= 0; i--) {
        data.push({
          timestamp: now - i * 2000,
          value: this.getInitialSensorValue(sensor),
        })
      }
      this.sensorData.set(sensor, data)
    })
  }

  private getInitialSensorValue(sensor: string): number {
    switch (sensor) {
      case 'heartRate': return 60 + Math.random() * 20
      case 'hrv': return 50 + Math.random() * 30
      case 'eda': return 1.0 + Math.random() * 3.0
      case 'temperature': return 36.0 + Math.random() * 1.5
      case 'audio': return 30 + Math.random() * 40
      default: return 50
    }
  }

  public start() {
    this.interval = setInterval(() => {
      this.update()
    }, 3000)
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  private update() {
    // Update metrics
    this.energy = Math.max(20, Math.min(100, this.energy + Math.random() * 10 - 5))
    this.mood = Math.max(20, Math.min(100, this.mood + Math.random() * 10 - 5))
    this.focus = Math.max(20, Math.min(100, this.focus + Math.random() * 10 - 5))
    
    // Calculate flow score
    this.flowScore = Math.round((this.energy + this.mood + this.focus) / 3)
    
    // Select emotion based on flow score
    const emotionsList = Object.values(this.emotions)
    if (this.flowScore > 80) {
      this.currentEmotion = Math.random() > 0.5 ? this.emotions.radiating : this.emotions.energized
    } else if (this.flowScore > 60) {
      this.currentEmotion = Math.random() > 0.5 ? this.emotions.focused : this.emotions.calm
    } else {
      this.currentEmotion = this.emotions.scattered
    }
    
    // Update current emotion intensity
    this.currentEmotion = {
      ...this.currentEmotion,
      intensity: this.flowScore,
    }
    
    // Add to history
    this.emotionHistory.push({
      time: Date.now(),
      emotion: { ...this.currentEmotion },
    })
    if (this.emotionHistory.length > 100) {
      this.emotionHistory.shift()
    }
    
    // Update sensor data
    this.updateSensorData()
    
    // Update recommendation
    this.currentRecommendation = this.getRecommendation()
    
    // Notify listeners
    this.notifyListeners()
  }

  private updateSensorData() {
    const now = Date.now()
    
    this.sensorData.forEach((readings, sensor) => {
      const lastValue = readings[readings.length - 1].value
      const variation = this.getSensorVariation(sensor)
      const newValue = Math.max(
        this.getSensorMin(sensor),
        Math.min(this.getSensorMax(sensor), lastValue + variation)
      )
      
      readings.push({ timestamp: now, value: newValue })
      if (readings.length > 50) {
        readings.shift()
      }
    })
  }

  private getSensorVariation(sensor: string): number {
    switch (sensor) {
      case 'heartRate': return Math.random() * 6 - 3
      case 'hrv': return Math.random() * 10 - 5
      case 'eda': return Math.random() * 0.6 - 0.3
      case 'temperature': return Math.random() * 0.2 - 0.1
      case 'audio': return Math.random() * 10 - 5
      default: return 0
    }
  }

  private getSensorMin(sensor: string): number {
    switch (sensor) {
      case 'heartRate': return 60
      case 'hrv': return 40
      case 'eda': return 1.0
      case 'temperature': return 36.0
      case 'audio': return 20
      default: return 0
    }
  }

  private getSensorMax(sensor: string): number {
    switch (sensor) {
      case 'heartRate': return 100
      case 'hrv': return 90
      case 'eda': return 5.0
      case 'temperature': return 38.0
      case 'audio': return 80
      default: return 100
    }
  }

  private getRecommendation(): Recommendation {
    const recommendations: Recommendation[] = [
      {
        title: 'Listen',
        description: 'Weightless by Marconi Union - scientifically proven to reduce anxiety by 65%',
        action: 'Play on Spotify',
        icon: '🎵',
        color: '#1DB954',
      },
      {
        title: 'Breathe',
        description: 'Box Breathing - 4-4-4-4 pattern to restore balance',
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
        title: 'Focus Time',
        description: 'Your concentration is peaking - perfect for deep work',
        action: 'Start Focus Session',
        icon: '🧠',
        color: '#9933FF',
      },
    ]
    
    if (this.currentEmotion.name === 'SCATTERED') {
      return recommendations[1]
    } else if (this.flowScore > 75) {
      return recommendations[4]
    } else if (this.energy < 50) {
      return recommendations[2]
    }
    
    return recommendations[Math.floor(Math.random() * recommendations.length)]
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }
}
