import { Typography, Card, CardMedia, Skeleton } from '@mui/material'
import type { Cat } from '../types/cat'

type CatFeaturedProps = {
  cat: Cat | null
  loading: boolean
  handleOpen: (cat: Cat) => void
}

export function CatFeatured({ cat, loading, handleOpen }: CatFeaturedProps) {
  return (
    <section className="my-8">
      <Typography variant="h5" component="h2" className="mb-4">
        Featured Cat
      </Typography>

      {loading && !cat ? (
        <Skeleton variant="rounded" height={320} />
      ) : cat ? (
        <Card
          onClick={() => handleOpen(cat)}
          className="cursor-pointer overflow-hidden rounded-2xl shadow transition hover:scale-[1.01]"
        >
          <CardMedia
            component="img"
            image={cat.url}
            alt={cat.breeds?.[0]?.name ?? 'Featured cat'}
            sx={{
              height: { xs: 260, md: 420 },
              objectFit: 'cover',
            }}
          />
        </Card>
      ) : null}
    </section>
  )
}