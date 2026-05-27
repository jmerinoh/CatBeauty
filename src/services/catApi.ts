import type { Cat, Breed } from '../types/cat'

export async function getBreeds(): Promise<Breed[]> {
  const response = await fetch('/api/breeds')
  if (!response.ok) throw new Error('Failed to fetch breeds')
  return response.json()
}

export async function getCats(breedId?: string, page = 0): Promise<Cat[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: '9',
  })

  if (breedId) {
    params.append('breedId', breedId)
  }

  const response = await fetch(`/api/cats?${params}`)
  if (!response.ok) throw new Error('Failed to fetch cats')
  return response.json()
}

export async function getFeaturedCat(): Promise<Cat> {
  const response = await fetch('/api/featured-cat')
  if (!response.ok) throw new Error('Failed to fetch featured cat')
  return response.json()
}


//

