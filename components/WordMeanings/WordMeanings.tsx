import { Meanings } from '@/services'
import React from 'react'
import { Box, Text } from '../ui'

export const WordMeanings = (asd: { meanings: Meanings[] }) => {
  return (
    <>
      {asd.meanings.map(({ partOfSpeech, definitions }, index) => (
        <Box key={index}>
          <Text size="sm" className="capitalize">
            {partOfSpeech}
          </Text>
          {definitions.map(({ example, definition }, index) => (
            <Box key={index}>
              <Text size="xs">Example: {example}</Text>
              <Text size="xs">Definition: {definition}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}
