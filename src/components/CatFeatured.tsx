import { Typography, Card, CardMedia, Skeleton } from "@mui/material";
import type { Cat } from '../types/cat'

type CatFeaturedProps = {
  cat: Cat | null
  loading: boolean
  handleOpen: (cat: Cat) => void
}

export function CatFeatured({ cat, loading, handleOpen }: CatFeaturedProps) {
  return (
    <section className="mb-8">
      <Typography variant="h5" className="mb-4 font-semibold">
        Featured Cat
      </Typography>

      {loading && !cat ? (
        <Skeleton variant="rectangular" height={420} className="rounded-2xl" />
      ) : cat ? (
        <Card
          onClick={() => handleOpen(cat)}
          className="overflow-hidden rounded-2xl shadow"
        >
          <CardMedia
            component="img"
            image={cat.url}
            alt={cat.breeds?.[0]?.name ?? cat.id}
            className="h-[260px] w-full cursor-pointer object-cover md:h-[420px]"
          />
        </Card>
      ) : null}
    </section>
  )
}