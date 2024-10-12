import { useAudioPlayer, useFavorites, useWordDetailsStore } from '@/hooks'
import { wordsService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Play } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetScrollView,
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Center,
  Heading,
  HStack,
  Progress,
  ProgressFilledTrack,
  Text
} from '../ui'
import { NotFoundWord } from './WordNotFound'

export const WordDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isOpen, word, onClose } = useWordDetailsStore()

  const { fetchAudio, playAudio, progress, unloadAudio, audio } = useAudioPlayer()

  const { data: favorites, favorite, unFavorite, isToogleFavorite } = useFavorites()

  const {
    data = [],
    error,
    refetch
  } = useQuery({
    queryKey: ['word', { name: word?.name }],
    queryFn: () => wordsService.details({ name: word?.name ?? '' }),
    enabled: !!word?.name,
    retry: false
  })

  const oneAudioSelected = data.reduce((acc, { phonetics }) => {
    const audio = phonetics?.find(({ audio }) => !!audio)?.audio
    if (audio) {
      return audio
    } else {
      return acc
    }
  }, '')

  useEffect(() => {
    if (oneAudioSelected) {
      fetchAudio(oneAudioSelected)
    }
  }, [oneAudioSelected, data])

  const currentData = data[currentIndex]

  const isFavorite = favorites?.data.some(({ words }) => words?.id === word?.id)

  useEffect(() => {
    if (word?.name) {
      refetch()
    }
  }, [word?.name])

  useEffect(() => {
    return () => {
      if (audio) {
        unloadAudio()
      }
    }
  }, [])

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleFavorite = () => {
    if (isFavorite) {
      unFavorite(word?.id as number)
    } else {
      favorite(word?.id as number)
    }
  }

  return (
    <>
      <Actionsheet closeOnOverlayClick snapPoints={[85]} isOpen={isOpen} onClose={onClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Center className="h-1/3 bg-pink-300 w-full">
            <Text>{word?.name}</Text>
            <Text size="xs">{currentData?.phonetic}</Text>
          </Center>
          {error ? (
            <NotFoundWord />
          ) : (
            <>
              {audio && (
                <HStack className="flex w-full gap-2 items-center my-2">
                  <Button variant="outline" onPress={() => playAudio()}>
                    <ButtonIcon>
                      <Play size={16} />
                    </ButtonIcon>
                  </Button>
                  <Progress className="max-w-[75%]" value={progress} size="lg" orientation="horizontal">
                    <ProgressFilledTrack />
                  </Progress>
                </HStack>
              )}
              <Heading className="mr-auto">Meanings</Heading>
              <ActionsheetScrollView className="max-h-[50%]">
                {currentData?.meanings.map(({ partOfSpeech, definitions }, index) => (
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
              </ActionsheetScrollView>
              <ActionsheetItem>
                <Button onPress={handlePrevious} isDisabled={currentIndex === 0}>
                  <ButtonText>Previous</ButtonText>
                </Button>
                <Button onPress={handleFavorite}>
                  <ButtonText>{isFavorite ? 'Unfavorite' : 'Favorite'}</ButtonText>
                  {isToogleFavorite && <ButtonSpinner />}
                </Button>
                <Button onPress={handleNext} isDisabled={currentIndex === data.length - 1}>
                  <ButtonText>Next</ButtonText>
                </Button>
              </ActionsheetItem>
            </>
          )}
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
