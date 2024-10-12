import { Meanings } from '@/services'
import React from 'react'
import { Box, Heading, Text } from '../ui'

export const WordMeanings = (props: { meanings: Meanings[] }) => {
  return (
    <Box>
      <Heading className="mr-auto">Meanings</Heading>

      {props.meanings.map(({ partOfSpeech, definitions }, index) => (
        <Box key={index}>
          <Heading size="xs" className="capitalize">
            As a {partOfSpeech}
          </Heading>
          {definitions.map(({ example, definition }, index) => (
            <Box key={index}>
              {example && <Text size="xs">Example: {example}</Text>}
              {definition && <Text size="xs">Definition: {definition}</Text>}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
