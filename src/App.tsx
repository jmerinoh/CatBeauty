import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Container,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
      {/* Top Bar */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar className="flex justify-between gap-4">
          <Typography variant="h6" className="font-bold">
            🐱 Catstagram
          </Typography>

          <Select
            size="small"
            displayEmpty
            defaultValue=""
            className="min-w-[180px] bg-white"
          >
            <MenuItem value="">Select breed</MenuItem>
            <MenuItem value="bengal">Bengal</MenuItem>
            <MenuItem value="siamese">Siamese</MenuItem>
            <MenuItem value="persian">Persian</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-6">
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
      </Container>

      {/* Detail Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex items-center justify-between">
          {selectedCat?.title}

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <img
            src={selectedCat?.image}
            alt={selectedCat?.title}
            className="mb-4 w-full rounded-xl object-cover"
          />

          <Typography variant="body1">
            No information available at the moment,
            we are working on it :)
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
