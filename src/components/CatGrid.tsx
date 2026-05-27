
import { Typography, Card, CardMedia } from "@mui/material"

type Cat = {
    id: number
    title: string
    image: string
}

type CatGridProps = {
    handleOpen: (cat: Cat) => void
}

export function CatGrid({ handleOpen }: CatGridProps) {

    return (
        <>
            {/* Cat Grid */}
            <section>
                <Typography variant="h5" className="mb-4 font-semibold">
                    Cat Grid
                </Typography>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, index) => {
                        const cat = {
                            id: index,
                            title: `Cat ${index + 1}`,
                            image: `https://placehold.co/600x400?text=Cat+${index + 1}`,
                        }

                        return (
                            <Card
                                key={cat.id}
                                onClick={() => handleOpen(cat)}
                                className="cursor-pointer overflow-hidden rounded-xl shadow transition hover:scale-[1.01]"
                            >
                                <CardMedia
                                    component="img"
                                    image={cat.image}
                                    alt={cat.title}
                                    className="aspect-square w-full object-cover"
                                />
                            </Card>
                        )
                    })}
                </div>
            </section>

        </>
    )
}