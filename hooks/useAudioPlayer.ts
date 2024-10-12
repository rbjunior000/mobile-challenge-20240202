import { Audio } from 'expo-av'
import { useState } from 'react'

export const useAudioPlayer = () => {
  const [audio, setAudio] = useState<Audio.Sound | null>(null)
  const [progress, setProgress] = useState(0)
  const [isAudioLoading, setIsAudioLoading] = useState(false)

  const fetchAudio = async (audioUri: string | null) => {
    if (!audioUri) return
    setIsAudioLoading(true)
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri })
      if (!sound) return

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isPlaying) {
          const progress = (status.positionMillis / (status.durationMillis || 1000)) * 100
          setProgress(progress)
        } else {
          setProgress(0)
        }
      })

      setAudio(sound)
    } catch (error) {
      console.error('Error loading sound:', error)
    } finally {
      setIsAudioLoading(false)
    }
  }

  const playAudio = () => {
    if (audio) {
      audio.playAsync()
    }
  }

  const unloadAudio = () => {
    if (audio) {
      audio.unloadAsync()
      setAudio(null)
    }
  }

  return {
    progress,
    playAudio,
    audio,
    fetchAudio,
    unloadAudio,
    isAudioLoading
  }
}
