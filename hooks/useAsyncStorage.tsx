import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

// Define os tipos para o hook
type SetValue<T> = (value: T | ((val: T) => T)) => Promise<void>

export function useAsyncStorage<T>(key: string, initialValue: T): [T, SetValue<T>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [loading, setLoading] = useState<boolean>(true)

  // Função para obter o valor do AsyncStorage
  const getStoredItem = async () => {
    try {
      const item = await AsyncStorage.getItem(key)
      if (item !== null) {
        setStoredValue(JSON.parse(item))
      } else {
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error('Error getting item from AsyncStorage', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para salvar o valor no AsyncStorage
  const setValue: SetValue<T> = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving item to AsyncStorage', error)
    }
  }

  useEffect(() => {
    getStoredItem()
  }, [])

  return [storedValue, setValue, loading]
}
