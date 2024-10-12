import { WordItem } from '@/components'
import { Box, Heading, Text } from '@/components/ui'
import { useFavorites, useWordDetailsStore } from '@/hooks'
import { Favorite } from '@/services'
import { groupArray } from '@/utils'
import React from 'react'
import { VirtualizedList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Item = ({ item }: { item: Favorite[] }) => {
  const { onOpen } = useWordDetailsStore()
  return (
    <Box className="flex flex-row justify-between flex-1">
      {item.map(({ words }) => (
        <WordItem
          onPress={() => {
            onOpen({ name: words?.name as string, id: words?.id as number })
          }}
          name={words?.name as string}
          key={words?.id as number}
        />
      ))}
    </Box>
  )
}

const FavoritesPage = () => {
  const { data = { data: [] }, isLoading } = useFavorites()

  return (
    <SafeAreaView className="flex-1">
      <Heading className="text-center" size="3xl">
        Favorites
      </Heading>
      <VirtualizedList<Favorite[]>
        data={groupArray(data?.data, 3) || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.reduce((acc, { id }) => `${acc}-${id}`, '')}
        getItemCount={() => Math.ceil(data?.data.length / 3)}
        getItem={(groupedData, index) => groupedData[index]}
        initialNumToRender={10}
        ListEmptyComponent={() => <Text className="text-center">No favorites found</Text>}
      />
    </SafeAreaView>
  )
}

export default FavoritesPage
