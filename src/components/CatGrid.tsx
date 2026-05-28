import { Typography, Card, CardMedia, Skeleton } from '@mui/material'
import type { Cat } from '../types/cat'

type CatGridProps = {
  cats: Cat[]
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  handleOpen: (cat: Cat) => void
  lastCatRef: (node: HTMLDivElement | null) => void
}

export function CatGrid({
  cats,
  loading,
  loadingMore,
  hasMore,
  handleOpen,
  lastCatRef,
}: CatGridProps) {
  return (
    <section className="mt-8">
      <Typography variant="h5" className="mb-4 font-semibold">
        Cat Grid
      </Typography>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                height={260}
                className="rounded-xl"
              />
            ))
          : cats.map((cat, index) => {
              const isLastCat = index === cats.length - 1

              return (
                <div key={`${cat.id}-${index}`} ref={isLastCat ? lastCatRef : null}>
                  <Card
                    onClick={() => handleOpen(cat)}
                    className="cursor-pointer overflow-hidden rounded-xl shadow transition hover:scale-[1.01]"
                  >
                    <CardMedia
                      component="img"
                      image={cat.url}
                      alt={cat.breeds?.[0]?.name ?? 'Cat'}
                      className="h-[260px] object-cover"
                    />
                  </Card>
                </div>
              )
            })}
      </div>

      {loadingMore && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={260}
              className="rounded-xl"
            />
          ))}
        </div>
      )}

      {!hasMore && cats.length > 0 && (
        <Typography className="mt-6 text-center text-gray-500">
          No more cats to load.
        </Typography>
      )}
    </section>
  )
}