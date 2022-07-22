import React from 'react'
import { Image, Text, AspectRatio, ScrollView } from 'native-base'
import { Movie } from '../../navigation/MovieList'

export function MoviePoster({
  item,
  showOverview,
}: {
  item: Movie
  showOverview?: boolean
}) {
  // const route = useRoute()

  return (
    <ScrollView>
      <AspectRatio
        ratio={{
          base: 3 / 4,
          md: 9 / 10,
        }}
      >
        <Image
          source={{
            uri: item.posterImage,
          }}
          alt={`${item.title} poster`}
          resizeMode="cover"
          w={'full'}
          h={'full'}
        />
      </AspectRatio>
      <Text
        _dark={{
          color: 'warmGray.50',
        }}
        color="coolGray.800"
        bold
        display={'flex'}
        flexWrap={'wrap'}
        flexShrink={1}
        fontSize="md"
      >
        {item.title}
      </Text>
      {showOverview ? (
        <Text
          _dark={{
            color: 'warmGray.50',
          }}
          color="coolGray.800"
          display={'flex'}
          flexWrap={'wrap'}
          flexShrink={1}
          fontSize="sm"
        >
          {item.overview}
        </Text>
      ) : null}
      <Text
        fontSize="xs"
        _dark={{
          color: 'warmGray.50',
        }}
        color="coolGray.800"
        alignSelf="flex-start"
      >
        {item.release_date
          ? `Released: ${new Date(item.release_date).toLocaleDateString()}`
          : 'No date scheduled.'}
      </Text>
    </ScrollView>
  )
}
