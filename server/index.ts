import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const app = express()
const PORT = 3001
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, 'data')
const HISTORY_FILE = path.join(DATA_DIR, 'history.json')

type Breed = {
  id: string
  name: string
  description?: string
}

type CatImage = {
  id: string
  url: string
  breeds?: Breed[]
}

type HistoryRecord = {
  id: string
  catImageId: string
  imageUrl: string
  breedName?: string
  clickedAt: string
  notes?: string
}

app.use(cors())
app.use(express.json())

async function ensureHistoryFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(HISTORY_FILE)
  } catch {
    await fs.writeFile(HISTORY_FILE, '[]', 'utf-8')
  }
}

async function readHistory(): Promise<HistoryRecord[]> {
  await ensureHistoryFile()
  const fileContent = await fs.readFile(HISTORY_FILE, 'utf-8')
  return JSON.parse(fileContent) as HistoryRecord[]
}

async function writeHistory(history: HistoryRecord[]) {
  await ensureHistoryFile()
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8')
}

async function fetchCatApi<T>(apiPath: string): Promise<T> {
  const response = await fetch(`${CAT_API_BASE_URL}${apiPath}`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY ?? '',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data?.message ?? `TheCatAPI request failed with status ${response.status}`,
    )
  }

  return data as T
}

async function hydrateBreedData(cat: CatImage): Promise<CatImage> {
  if (cat.breeds && cat.breeds.length > 0) {
    return cat
  }

  try {
    const hydratedCat = await fetchCatApi<CatImage>(`/images/${cat.id}`)

    return {
      ...cat,
      breeds: hydratedCat.breeds ?? [],
    }
  } catch {
    return {
      ...cat,
      breeds: [],
    }
  }
}

app.get('/api/breeds', async (_req, res) => {
  try {
    const breeds = await fetchCatApi<Breed[]>('/breeds')
    return res.json(breeds)
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Failed to load breeds.',
    })
  }
})

app.get('/api/cats', async (req, res) => {
  try {
    const { breedId, page = '0', limit = '9' } = req.query

    const params = new URLSearchParams({
      limit: String(limit),
      page: String(page),
      has_breeds: '1',
      include_breeds: '1',
    })

    if (breedId) {
      params.append('breed_ids', String(breedId))
    }

    const cats = await fetchCatApi<CatImage[]>(`/images/search?${params}`)
    const hydratedCats = await Promise.all(cats.map(hydrateBreedData))

    return res.json(hydratedCats)
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Failed to load cats.',
    })
  }
})

app.get('/api/featured-cat', async (_req, res) => {
  try {
    const breeds = await fetchCatApi<Breed[]>('/breeds')

    const shuffledBreeds = [...breeds].sort(() => Math.random() - 0.5)
    const maxAttempts = Math.min(10, shuffledBreeds.length)

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const breed = shuffledBreeds[attempt]

      const params = new URLSearchParams({
        limit: '1',
        has_breeds: '1',
        include_breeds: '1',
        breed_ids: breed.id,
      })

      const cats = await fetchCatApi<CatImage[]>(`/images/search?${params}`)

      if (cats.length > 0) {
        const hydratedCat = await hydrateBreedData(cats[0])
        return res.json(hydratedCat)
      }
    }

    return res.status(404).json({
      message: 'No featured cat found after checking multiple breeds.',
    })
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Failed to load featured cat.',
    })
  }
})

app.get('/api/history', async (_req, res) => {
  try {
    const history = await readHistory()

    const sortedHistory = [...history].sort(
      (a, b) =>
        new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime(),
    )

    return res.json(sortedHistory)
  } catch {
    return res.status(500).json({ message: 'Failed to load click history.' })
  }
})

app.post('/api/history', async (req, res) => {
  try {
    const { catImageId, imageUrl, breedName } = req.body

    if (!catImageId || !imageUrl) {
      return res.status(400).json({
        message: 'catImageId and imageUrl are required.',
      })
    }

    const history = await readHistory()

    const newRecord: HistoryRecord = {
      id: crypto.randomUUID(),
      catImageId,
      imageUrl,
      breedName,
      clickedAt: new Date().toISOString(),
    }

    history.push(newRecord)
    await writeHistory(history)

    return res.status(201).json(newRecord)
  } catch {
    return res.status(500).json({ message: 'Failed to create history record.' })
  }
})

app.put('/api/history/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { breedName, notes } = req.body

    const history = await readHistory()
    const recordIndex = history.findIndex((record) => record.id === id)

    if (recordIndex === -1) {
      return res.status(404).json({ message: 'History record not found.' })
    }

    history[recordIndex] = {
      ...history[recordIndex],
      breedName: breedName ?? history[recordIndex].breedName,
      notes: notes ?? history[recordIndex].notes,
    }

    await writeHistory(history)

    return res.json(history[recordIndex])
  } catch {
    return res.status(500).json({ message: 'Failed to update history record.' })
  }
})

app.delete('/api/history/:id', async (req, res) => {
  try {
    const { id } = req.params

    const history = await readHistory()
    const filteredHistory = history.filter((record) => record.id !== id)

    if (filteredHistory.length === history.length) {
      return res.status(404).json({ message: 'History record not found.' })
    }

    await writeHistory(filteredHistory)

    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: 'Failed to delete history record.' })
  }
})

app.listen(PORT, () => {
  console.log(`CatBeauty backend running on http://localhost:${PORT}`)
})