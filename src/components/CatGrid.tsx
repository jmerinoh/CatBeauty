import InfiniteScroll from 'react-infinite-scroll-component'
import { Typography, Card, CardMedia, Skeleton, Box } from '@mui/material'
import type { Cat } from '../types/cat'

type CatGridProps = {
  cats: Cat[]
  loading: boolean
  hasMore: boolean
  loadMore: () => void
  handleOpen: (cat: Cat) => void
}

export function CatGrid({
  cats,
  loading,
  hasMore,
  loadMore,
  handleOpen,
}: CatGridProps) {
  return (
    <section className="my-8">
      <Typography variant="h5" component="h2" className="mb-4">
        Cat Grid
      </Typography>

      <InfiniteScroll
        dataLength={cats.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={240} />
            ))}
          </Box>
        }
        endMessage={
          cats.length > 0 ? (
            <Typography align="center" className="py-6" color="text.secondary">
              No more cats to load.
            </Typography>
          ) : null
        }
      >
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {loading && cats.length === 0
            ? Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={240} />
              ))
            : cats.map((cat) => (
                <Card
                  key={cat.id}
                  onClick={() => handleOpen(cat)}
                  className="cursor-pointer overflow-hidden rounded-xl shadow transition hover:scale-[1.01]"
                >
                  <CardMedia
                    component="img"
                    image={cat.url}
                    alt={cat.breeds?.[0]?.name ?? 'Cat'}
                    sx={{
                      height: 240,
                      objectFit: 'cover',
                    }}
                  />
                </Card>
              ))}
        </Box>
      </InfiniteScroll>
    </section>
  )
}