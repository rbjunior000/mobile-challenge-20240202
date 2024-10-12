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
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Center,
  HStack,
  Progress,
  ProgressFilledTrack,
  Text
} from '../ui'
import { WordMeanings } from '../WordMeanings'
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
  }, [oneAudioSelected])

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
          <Center className="h-[100px] mb-2 bg-pink-300 w-full">
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
              <ActionsheetScrollView className="max-h-[400px]">
                <WordMeanings meanings={currentData?.meanings || []} />
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
