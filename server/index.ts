import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1'

app.use(cors())
app.use(express.json())

app.get('/api/breeds', async (_req, res) => {
  const response = await fetch(`${CAT_API_BASE_URL}/breeds`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY ?? '',
    },
  })

  const data = await response.json()
  res.json(data)
})

app.get('/api/cats', async (req, res) => {
  const { breedId, page = '0', limit = '9' } = req.query

  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    has_breeds: '1',
  })

  if (breedId) {
    params.append('breed_ids', String(breedId))
  }

  const response = await fetch(`${CAT_API_BASE_URL}/images/search?${params}`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY ?? '',
    },
  })

  const data = await response.json()
  res.json(data)
})

app.get('/api/featured-cat', async (_req, res) => {
  const response = await fetch(
    `${CAT_API_BASE_URL}/images/search?limit=1&has_breeds=1`,
    {
      headers: {
        'x-api-key': process.env.CAT_API_KEY ?? '',
      },
    }
  )

  const data = await response.json()
  res.json(data[0])
})

app.listen(PORT, () => {
  console.log(`Catstagram backend running on http://localhost:${PORT}`)
})