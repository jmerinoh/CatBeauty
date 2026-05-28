import type { Cat } from '../types/cat'
import type { HistoryRecord } from '../types/history'

type ApiErrorResponse = {
  message?: string
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T
  }

  let data: T | ApiErrorResponse

  try {
    data = await response.json()
  } catch {
    throw new Error('Invalid JSON response from server.')
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === 'object' &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : `Request failed with status ${response.status}`

    throw new Error(message)
  }

  return data as T
}

export async function getHistory(): Promise<HistoryRecord[]> {
  const response = await fetch('/api/history')
  return parseJsonResponse<HistoryRecord[]>(response)
}

export async function createHistoryRecord(cat: Cat): Promise<HistoryRecord> {
  const breed = cat.breeds?.[0]

  const response = await fetch('/api/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      catImageId: cat.id,
      imageUrl: cat.url,
      breedName: breed?.name,
    }),
  })

  return parseJsonResponse<HistoryRecord>(response)
}

export async function updateHistoryRecord(
  id: string,
  values: Partial<Pick<HistoryRecord, 'breedName' | 'notes'>>,
): Promise<HistoryRecord> {
  const response = await fetch(`/api/history/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  return parseJsonResponse<HistoryRecord>(response)
}

export async function deleteHistoryRecord(id: string): Promise<void> {
  const response = await fetch(`/api/history/${id}`, {
    method: 'DELETE',
  })

  return parseJsonResponse<void>(response)
}