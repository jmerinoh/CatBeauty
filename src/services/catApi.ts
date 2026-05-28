import type { Cat, Breed } from '../types/cat'

type ApiErrorResponse = {
  message?: string
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  let data: T | ApiErrorResponse

  try {
    data = await response.json()
  } catch {
    throw new Error('Invalid JSON response from server')
  }

  if (!response.ok) {
    const message =
      'message' in data && data.message
        ? data.message
        : `Request failed with status ${response.status}`

    throw new Error(message)
  }

  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    throw new Error(data.message)
  }

  return data as T
}

export async function getBreeds(): Promise<Breed[]> {
  const response = await fetch('/api/breeds')
  const data = await parseJsonResponse<Breed[]>(response)

  if (!Array.isArray(data)) {
    throw new Error('Invalid breeds response format')
  }

  return data
}

export async function getCats(
  breedId?: string,
  page = 0
): Promise<Cat[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: '9',
  })

  if (breedId) {
    params.append('breedId', breedId)
  }

  const response = await fetch(`/api/cats?${params}`)
  const data = await parseJsonResponse<Cat[]>(response)

  if (!Array.isArray(data)) {
    throw new Error('Invalid cats response format')
  }

  return data
}

export async function getFeaturedCat(): Promise<Cat> {
  const response = await fetch('/api/featured-cat')
  const data = await parseJsonResponse<Cat>(response)

  if (!data || typeof data !== 'object' || !('url' in data)) {
    throw new Error('Invalid featured cat response format')
  }

  return data
}