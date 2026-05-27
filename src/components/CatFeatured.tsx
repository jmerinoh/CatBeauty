import { Typography, Card, CardMedia } from "@mui/material";

export function CatFeatured() {
    return (
        <>
            {/* Featured Content */}
            <section className="mb-8">
                <Typography variant="h5" className="mb-4 font-semibold">
                    Featured Cat
                </Typography>

                <Card className="overflow-hidden rounded-2xl shadow">
                    <CardMedia
                        component="img"
                        image="https://placehold.co/1200x500?text=Featured+Cat"
                        alt="Featured cat"
                        className="h-[260px] w-full cursor-pointer object-cover md:h-[420px]"
                    />
                </Card>
            </section>
        </>
    )
}