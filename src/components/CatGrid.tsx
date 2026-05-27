import { Typography, Card, CardMedia, Skeleton } from '@mui/material'
import type { Cat } from '../types/cat'

type CatGridProps = {
  cats: Cat[]
  loading: boolean
  handleOpen: (cat: Cat) => void
}

export function CatGrid({ cats, loading, handleOpen }: CatGridProps) {
  return (
    <section>
      <Typography variant="h5" className="mb-4 font-semibold">
        Cat Grid
      </Typography>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                className="aspect-square rounded-xl"
              />
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
                  alt={cat.breeds?.[0]?.name ?? cat.id}
                  className="aspect-square w-full object-cover"
                />
              </Card>
            ))}
      </div>
    </section>
  )
}