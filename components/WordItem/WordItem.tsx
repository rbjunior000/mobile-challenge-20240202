import React from 'react'
import { Pressable, Text } from '../ui'

type WordItemProps = {
  name: string
  onPress: () => void
}
export const WordItem = ({ name, onPress }: WordItemProps) => {
  return (
    <Pressable className="flex-1 bg-yellow-500 text-black flex justify-center items-center m-2 p-4 rounded-md h-20 w-content" onPress={onPress}>
      <Text>{name}</Text>
    </Pressable>
  )
}
