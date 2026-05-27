export async function getBreeds() {
  const response = await fetch('/api/breeds')
  return response.json()
}

export async function getCats(breedId?: string, page = 0) {
  const params = new URLSearchParams({
    page: String(page),
    limit: '9',
  })

  if (breedId) {
    params.append('breedId', breedId)
  }

  const response = await fetch(`/api/cats?${params}`)
  return response.json()
}

export async function getFeaturedCat() {
  const response = await fetch('/api/featured-cat')
  return response.json()
}