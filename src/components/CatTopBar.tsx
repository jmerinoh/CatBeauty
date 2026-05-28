import PetsIcon from '@mui/icons-material/Pets'
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { Breed } from '../types/cat'

type CatTopBarProps = {
  breeds?: Breed[]
  selectedBreedId?: string
  onBreedChange?: (breedId: string) => void
  showBreedSelector?: boolean
}

export function CatTopBar({
  breeds = [],
  selectedBreedId = '',
  onBreedChange,
  showBreedSelector = true,
}: CatTopBarProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onBreedChange?.(event.target.value)
  }

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar className="gap-4">
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          startIcon={<PetsIcon />}
          sx={{ textTransform: 'none' }}
        >
          <Typography variant="h6" component="span">
            CatBeauty
          </Typography>
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {showBreedSelector && (
          <Select
            size="small"
            value={selectedBreedId}
            onChange={handleChange}
            displayEmpty
            sx={{ minWidth: 180, backgroundColor: 'white' }}
          >
            <MenuItem value="">Select breed</MenuItem>

            {breeds.map((breed) => (
              <MenuItem key={breed.id} value={breed.id}>
                {breed.name}
              </MenuItem>
            ))}
          </Select>
        )}

        <Button component={RouterLink} to="/history" color="inherit">
          History
        </Button>
      </Toolbar>
    </AppBar>
  )
}