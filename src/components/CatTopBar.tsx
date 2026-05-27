import {
    AppBar, Toolbar, Typography, Select,
    MenuItem,
} from '@mui/material'

export function CatTopBar() {
    return (
        <>
            {/* Top Bar */}
            <AppBar position="sticky" color="default" elevation={1}>
                <Toolbar className="flex justify-between gap-4">
                    <Typography variant="h6" className="font-bold">
                        🐱 Catstagram
                    </Typography>

                    <Select
                        size="small"
                        displayEmpty
                        defaultValue=""
                        className="min-w-[180px] bg-white"
                    >
                        <MenuItem value="">Select breed</MenuItem>
                        <MenuItem value="bengal">Bengal</MenuItem>
                        <MenuItem value="siamese">Siamese</MenuItem>
                        <MenuItem value="persian">Persian</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </>
    );
}