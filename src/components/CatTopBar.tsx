import {
    AppBar, Toolbar, Typography, Select,
    MenuItem,
} from '@mui/material'

import type { SelectChangeEvent } from '@mui/material'
import type { Breed } from '../types/cat'

type CatTopBarProps = {
  breeds: Breed[]
  selectedBreedId: string
  onBreedChange: (breedId: string) => void
}

export function CatTopBar({
  breeds,
  selectedBreedId,
  onBreedChange,
}: CatTopBarProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onBreedChange(event.target.value)
  }

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar className="flex justify-between gap-4">
        <Typography variant="h6" className="font-bold">
          🐱 Catstagram
        </Typography>

        <Select
          size="small"
          displayEmpty
          value={selectedBreedId}
          onChange={handleChange}
          className="min-w-[180px] bg-white"
        >
          <MenuItem value="">Select breed</MenuItem>

          {breeds.map((breed) => (
            <MenuItem key={breed.id} value={breed.id}>
              {breed.name}
            </MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  )
}