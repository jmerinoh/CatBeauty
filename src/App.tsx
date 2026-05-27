import { useEffect, useState } from 'react'
import './App.css'

import { Container, Alert } from '@mui/material'

import { CatTopBar } from './components/CatTopBar'
import { CatFeatured } from './components/CatFeatured'
import { CatModal } from './components/CatModal'
import { CatGrid } from './components/CatGrid'

import { getBreeds, getCats, getFeaturedCat } from './services/catApi'
import type { Breed, Cat } from './types/cat'

function App() {

  const [breeds, setBreeds] = useState<Breed[]>([])
  const [selectedBreedId, setSelectedBreedId] = useState('')

  const [featuredCat, setFeaturedCat] = useState<Cat | null>(null)
  const [cats, setCats] = useState<Cat[]>([])

  const [selectedCat, setSelectedCat] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true)

        const [breedsData, featuredCatData, catsData] = await Promise.all([
          getBreeds(),
          getFeaturedCat(),
          getCats(),
        ])

        setBreeds(breedsData)
        setFeaturedCat(featuredCatData)
        setCats(catsData)
      } catch {
        setError('Something went wrong loading Catstagram.')
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
        const catsData = await getCats(selectedBreedId)
        setCats(catsData)
      } catch {
        setError('Something went wrong loading cats for this breed.')
      } finally {
        setLoading(false)
      }
    }

    loadCatsByBreed()
  }, [selectedBreedId])

  const handleOpen = (cat: any) => {
    setSelectedCat(cat)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


 return (
    <div className="min-h-screen bg-gray-100">
      <CatTopBar
        breeds={breeds}
        selectedBreedId={selectedBreedId}
        onBreedChange={setSelectedBreedId}
      />

      <Container maxWidth="lg" className="py-6">
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <CatFeatured
          cat={featuredCat}
          loading={loading}
          handleOpen={handleOpen}
        />

        <CatGrid
          cats={cats}
          loading={loading}
          handleOpen={handleOpen}
        />
      </Container>

      <CatModal
        open={open}
        selectedCat={selectedCat}
        handleClose={handleClose}
      />
    </div>
  )
}

export default App
