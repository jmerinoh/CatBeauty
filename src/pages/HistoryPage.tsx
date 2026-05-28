import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CatTopBar } from '../components/CatTopBar'
import {
  deleteHistoryRecord,
  getHistory,
  updateHistoryRecord,
} from '../services/historyApi'

export function HistoryPage() {
  const queryClient = useQueryClient()

  const {
    data: history = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['history'],
    queryFn: getHistory,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteHistoryRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (id: string) =>
      updateHistoryRecord(id, { notes: 'Reviewed from History page' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] })
    },
  })

  return (
    <>
      <CatTopBar showBreedSelector={false} />

      <Container maxWidth="lg" className="py-8">
        <Box className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <Box>
            <Typography variant="h4" component="h1">
              Click History
            </Typography>

            <Typography color="text.secondary">
              Recently opened cats, newest first.
            </Typography>
          </Box>

          <Button href="/" variant="outlined">
            Back to Home
          </Button>
        </Box>

        {isError && (
          <Alert severity="error" className="mb-6">
            {error instanceof Error
              ? error.message
              : 'Something went wrong loading history.'}
          </Alert>
        )}

        {isLoading ? (
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={320} />
            ))}
          </Box>
        ) : history.length === 0 ? (
          <Alert severity="info">
            No history yet. Open a cat modal from the Home page and it will
            appear here.
          </Alert>
        ) : (
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {history.map((record) => (
              <Card key={record.id} className="overflow-hidden rounded-xl shadow">
                <CardMedia
                  component="img"
                  image={record.imageUrl}
                  alt={record.breedName ?? record.catImageId}
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                  }}
                />

                <CardContent>
                  <Box className="flex items-start justify-between gap-2">
                    <Box>
                      <Typography variant="h6" component="h2">
                        {record.breedName ?? 'Unknown breed'}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {new Date(record.clickedAt).toLocaleString()}
                      </Typography>

                      {record.notes && (
                        <Typography variant="body2" className="mt-2">
                          {record.notes}
                        </Typography>
                      )}
                    </Box>

                    <Box className="flex gap-1">
                      <IconButton
                        aria-label="Mark history item as reviewed"
                        onClick={() => updateMutation.mutate(record.id)}
                        disabled={updateMutation.isPending}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-label="Delete history item"
                        onClick={() => deleteMutation.mutate(record.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </>
  )
}