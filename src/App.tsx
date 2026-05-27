import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import {
  Container,
} from '@mui/material'

import { CatTopBar } from './components/CatTopBar'
import { CatFeatured } from './components/CatFeatured'
import { CatDialog } from './components/CatDialog'
import { CatGrid } from './components/CatGrid'

function App() {

  const [selectedCat, setSelectedCat] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const handleOpen = (cat: any) => {
    setSelectedCat(cat)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div className="min-h-screen bg-gray-100">

      <CatTopBar />

      <Container maxWidth="lg" className="py-6">
        <CatFeatured />
        <CatGrid
          handleOpen={handleOpen}
        />
      </Container>

      <CatDialog
        open={open}
        selectedCat={selectedCat}
        handleClose={handleClose}
      />
    </div>
  )
}

export default App
