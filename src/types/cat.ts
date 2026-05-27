export type Breed = {
  id: string
  name: string
  description?: string
}

export type Cat = {
  id: string
  url: string
  breeds?: Breed[]
}