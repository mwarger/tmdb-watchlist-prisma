import React from 'react'
import { Box, FlatList } from 'native-base'
import { MoviePoster } from '../features/home/MoviePoster'
import { MoviesType } from '@conference-demos/trpc-server'
import { Link } from 'solito/link'

export type Movie = MoviesType['movies'][number]

export function MovieList({ movieData }: { movieData: Movie[] }) {
  return (
    <Box
      pb={5}
      _dark={{
        backgroundColor: '#000',
      }}
    >
      <FlatList
        numColumns={2}
        data={movieData}
        renderItem={({ item }) => {
          return (
            <Box width="50%">
              <Link href={`/movie/${item.id}`} style={{ width: '100%' }}>
                <Box p="2">
                  <MoviePoster item={item} />
                </Box>
              </Link>
            </Box>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  )
}
