import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField } from '@mui/material';

export default function AcceptApplicationDialog({ name }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button
                variant="outlined"
                color="success"
                onClick={handleClickOpen}
            >
                Accept Application
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Accpet internship application?"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>{"Send a message of acceptance to " + name + ":"}</DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message"
                        fullWidth
                        multiline
                        variant="standard"
                    />
                    <FormControlLabel control={<Checkbox />} label="Deny applications for other students" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Accpet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
