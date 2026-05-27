import CloseIcon from '@mui/icons-material/Close'

import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
} from '@mui/material'

import type { Cat } from '../types/cat'

type CatModalProps = {
  open: boolean
  selectedCat: Cat | null
  handleClose: () => void
}

export function CatModal({ open, selectedCat, handleClose }: CatModalProps) {
  const breed = selectedCat?.breeds?.[0]

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex items-center justify-between">
        {breed?.name ?? selectedCat?.id}

        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {selectedCat && (
          <img
            src={selectedCat.url}
            alt={breed?.name ?? selectedCat.id}
            className="mb-4 w-full rounded-xl object-cover"
          />
        )}

        <Typography variant="body1">
          {breed?.description ??
            'No information available at the moment, we are working on it :)'}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}