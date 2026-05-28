import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Container, Alert } from '@mui/material'

import { CatTopBar } from './components/CatTopBar'
import { CatFeatured } from './components/CatFeatured'
import { CatModal } from './components/CatModal'
import { CatGrid } from './components/CatGrid'
import { getBreeds, getCats, getFeaturedCat } from './services/catApi'
import type { Breed, Cat } from './types/cat'

const PAGE_SIZE = 10

function App() {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [selectedBreedId, setSelectedBreedId] = useState('')
  const [featuredCat, setFeaturedCat] = useState<Cat | null>(null)
  const [cats, setCats] = useState<Cat[]>([])
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [open, setOpen] = useState(false)

  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState('')

  const observerRef = useRef<IntersectionObserver | null>(null)

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
        setHasMore(catsData.length === PAGE_SIZE)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong loading Catstagram.'
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
        setLoading(true)
        setError('')
        setPage(0)
        setHasMore(true)

        const catsData = await getCats(selectedBreedId, 0)

        setCats(catsData)
        setHasMore(catsData.length === PAGE_SIZE)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong loading cats for this breed.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadCatsByBreed()
  }, [selectedBreedId])

  const loadMoreCats = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return

    try {
      setLoadingMore(true)
      setError('')

      const nextPage = page + 1
      const newCats = await getCats(selectedBreedId, nextPage)

      setCats((currentCats) => [...currentCats, ...newCats])
      setPage(nextPage)
      setHasMore(newCats.length === PAGE_SIZE)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong loading more cats.'
      )
    } finally {
      setLoadingMore(false)
    }
  }, [selectedBreedId, page, loading, loadingMore, hasMore])

  const lastCatRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCats()
        }
      })

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [loading, loadingMore, hasMore, loadMoreCats]
  )

  const handleOpen = (cat: Cat) => {
    setSelectedCat(cat)
    setOpen(true)
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
      />

      <Container className="py-6">
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {featuredCat && <CatFeatured cat={featuredCat} />}

        <CatGrid
          cats={cats}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          handleOpen={handleOpen}
          lastCatRef={lastCatRef}
        />
      </Container>

      <CatModal open={open} cat={selectedCat} handleClose={handleClose} />
    </>
  )
}

export default App