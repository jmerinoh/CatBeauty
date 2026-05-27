
import CloseIcon from '@mui/icons-material/Close'

import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography
} from "@mui/material";

type CatDialogProps = {
    open: boolean
    selectedCat: any
    handleClose: () => void
}

export function CatDialog({ open, selectedCat, handleClose }: CatDialogProps) {
    return (
        <>
            {/* Detail Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle className="flex items-center justify-between">
                    {selectedCat?.title}

                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <img
                        src={selectedCat?.image}
                        alt={selectedCat?.title}
                        className="mb-4 w-full rounded-xl object-cover"
                    />

                    <Typography variant="body1">
                        No information available at the moment,
                        we are working on it :)
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}