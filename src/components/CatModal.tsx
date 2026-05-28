import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Box,
} from '@mui/material'
import type { Cat } from '../types/cat'

type CatModalProps = {
  open: boolean
  selectedCat: Cat | null
  handleClose: () => void
}

export function CatModal({ open, selectedCat, handleClose }: CatModalProps) {
  const breed = selectedCat?.breeds?.[0]
  const title = breed?.name ?? 'Unknown breed'
  const description =
    breed?.description ??
    'No information available at the moment, we are working on it :)'

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {title}

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          aria-label="Close modal"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {selectedCat && (
          <Box
            component="img"
            src={selectedCat.url}
            alt={title}
            sx={{
              width: '100%',
              maxHeight: 560,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        <Typography>{description}</Typography>
      </DialogContent>
    </Dialog>
  )
}