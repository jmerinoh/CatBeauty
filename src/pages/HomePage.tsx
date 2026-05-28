import { useEffect, useState } from 'react'
import { Alert, Container } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { CatTopBar } from '../components/CatTopBar'
import { CatFeatured } from '../components/CatFeatured'
import { CatGrid } from '../components/CatGrid'
import { CatModal } from '../components/CatModal'
import { getBreeds, getCats, getFeaturedCat } from '../services/catApi'
import { createHistoryRecord } from '../services/historyApi'
import type { Breed, Cat } from '../types/cat'

export function HomePage() {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [selectedBreedId, setSelectedBreedId] = useState('')
  const [featuredCat, setFeaturedCat] = useState<Cat | null>(null)
  const [cats, setCats] = useState<Cat[]>([])
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [gridLoading, setGridLoading] = useState(false)
  const [error, setError] = useState('')

  const addHistoryMutation = useMutation({
    mutationFn: createHistoryRecord,
  })

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true)
        setError('')

        const [breedsData, featuredCatData, catsData] = await Promise.all([
          getBreeds(),
          getFeaturedCat(),
          getCats('', 0),
        ])

        setBreeds(breedsData)
        setFeaturedCat(featuredCatData)
        setCats(catsData)
        setPage(0)
        setHasMore(catsData.length > 0)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong loading CatBeauty.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    async function loadCatsByBreed() {
      try {
        setGridLoading(true)
        setError('')

        const catsData = await getCats(selectedBreedId, 0)

        setCats(catsData)
        setPage(0)
        setHasMore(catsData.length > 0)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong loading cats for this breed.',
        )
      } finally {
        setGridLoading(false)
      }
    }

    loadCatsByBreed()
  }, [selectedBreedId])

  const loadMoreCats = async () => {
    try {
      const nextPage = page + 1
      const nextCats = await getCats(selectedBreedId, nextPage)

      if (nextCats.length === 0) {
        setHasMore(false)
        return
      }

      setCats((currentCats) => [...currentCats, ...nextCats])
      setPage(nextPage)
    } catch {
      setHasMore(false)
      setError('Something went wrong loading more cats.')
    }
  }

  const handleOpen = (cat: Cat) => {
    setSelectedCat(cat)
    setOpen(true)
    addHistoryMutation.mutate(cat)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CatTopBar
        breeds={breeds}
        selectedBreedId={selectedBreedId}
        onBreedChange={setSelectedBreedId}
        showBreedSelector
      />

      <Container maxWidth="lg" className="py-6">
        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <CatFeatured cat={featuredCat} loading={loading} handleOpen={handleOpen} />

        <CatGrid
          cats={cats}
          loading={loading || gridLoading}
          hasMore={hasMore}
          loadMore={loadMoreCats}
          handleOpen={handleOpen}
        />

        <CatModal
          open={open}
          selectedCat={selectedCat}
          handleClose={handleClose}
        />
      </Container>
    </>
  )
} 