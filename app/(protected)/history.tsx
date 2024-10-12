import { WordItem } from '@/components'
import { Box, Heading } from '@/components/ui'
import { useHistory, useWordDetailsStore } from '@/hooks'
import { Favorite, History } from '@/services'
import { groupArray } from '@/utils'
import React from 'react'
import { VirtualizedList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Item = ({ item }: { item: Favorite[] }) => {
  const { onOpen } = useWordDetailsStore()
  return (
    <Box className="flex flex-row justify-between flex-1">
      {item.map(({ words }, index) => (
        <WordItem
          key={index}
          onPress={() => {
            onOpen({ name: words?.name as string, id: words?.id as number })
          }}
          name={words?.name as string}
        />
      ))}
    </Box>
  )
}

const HistoryPage = () => {
  const { data } = useHistory()

  const allData = (data?.pages?.flatMap((data) => data.map((word) => word)) || []) as History[]

  return (
    <SafeAreaView className="flex-1">
      <Heading className="text-center" size="3xl">
        History
      </Heading>
      <VirtualizedList<Favorite[]>
        data={groupArray(allData, 3) || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => {
          return item.reduce((acc, { id }) => `${acc}-${id}`, '')
        }}
        getItemCount={() => Math.ceil(allData.length / 3)}
        getItem={(groupedData, index) => groupedData[index]}
        initialNumToRender={10}
      />
    </SafeAreaView>
  )
}

export default HistoryPage
