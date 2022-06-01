import React, { useState } from 'react';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


export default function EditStudent(props) {

    const [textValue, setTextValue] = useState("");

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Edit your profile
                </Typography>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                    <Grid container style={{ alignItems: "center", justifyContent: "center" }} spacing={3} sx={{ mb: 3 }}>
                        <Box sx={{ mb: 3, position: "relative" }} variant="outlined">

                        <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}>
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change email and username</Typography>
                            <TextField name={""} style={{ marginLeft: 25 }} label={"New email"} fullWidth />
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}>  </Typography>
                            <TextField name={""} style={{ marginLeft: 25 }} label={"New username"} fullWidth />
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change basic info </Typography>
                            {/* <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} fullWidth />
                            <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} fullWidth /> */}
                            <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}></Grid>
                            <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} />
                            <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} />

                    </Grid>
                    </Box>
                </Grid>

                <Box sx={{ mb: 3, position: "relative" }} variant="outlined">
                    
                    <Button variant="contained" endIcon={<SendIcon />}> Submit changes </Button>
                </Box>
            </Paper>

        </React.Fragment>
        </Container >
    );
}