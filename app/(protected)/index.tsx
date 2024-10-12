import { useAuth, WordItem } from '@/components'
import { Box, Heading } from '@/components/ui'
import { useHistory, useWordDetailsStore } from '@/hooks'
import { PaginatedOutput, Word, wordsService } from '@/services'
import { groupArray } from '@/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { VirtualizedList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { onOpen } = useWordDetailsStore()

  const { user_id } = useAuth()
  const {
    data,
    fetchNextPage,
    isLoading: loading
  } = useInfiniteQuery<PaginatedOutput<Word>>({
    queryKey: ['words'],
    getNextPageParam: (lastPage, pages) => {
      return pages.length * 30
    },
    queryFn: ({ pageParam }) => wordsService.paginated({ limit: 30, offset: pageParam as number }),
    initialPageParam: 0
  })

  const { saveHistory } = useHistory()

  const words = (data?.pages?.flatMap(({ data }) => data.map((word) => word)) || []) as Word[]

  const Item = ({ item }: { item: Word[] }) => (
    <Box className="flex flex-row justify-between flex-1">
      {item.map((word) => (
        <WordItem
          onPress={() => {
            onOpen({ name: word.name, id: word.id })
            saveHistory({ user_id, word_id: String(word.id) })
          }}
          name={word.name}
          key={word.id}
        />
      ))}
    </Box>
  )

  return (
    <SafeAreaView className="flex-1">
      <Heading className="text-center" size="3xl">
        Words
      </Heading>
      <VirtualizedList<Word[]>
        data={groupArray(words, 3) || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.reduce((acc, { id }) => `${acc}-${id}`, '')}
        getItemCount={() => Math.ceil(words.length / 3)}
        getItem={(groupedData, index) => groupedData[index]}
        onEndReached={() => fetchNextPage()}
        initialNumToRender={10}
      />
    </SafeAreaView>
  )
}

export default Home
