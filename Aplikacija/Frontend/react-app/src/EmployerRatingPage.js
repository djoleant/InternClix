import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { useState } from 'react';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Radio,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel
} from '@mui/material';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RadioGroup from '@mui/material/RadioGroup';
import SendIcon from '@mui/icons-material/Send';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HoverRating from './components/EmployerInfo/HoverRating';

export default function EmployerRatingPage(props) {

    const [textValue, setTextValue] = useState("");

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Rate your internship experience
                </Typography>
                <Paper
                    sx={{ p: 3, mb: 4, backgroundColor:"#f3f3f3" }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
                    Leave a public rating of your former/current employer in <span style={{color: 'red', fontWeight:'bold'}}> under 60 seconds! </span> The experience you share will prove valuable for other internship seekers looking for work!
                    </Typography>
                </Paper>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                <Grid container style={{alignItems : "center", justifyContent:"center"}} spacing={3} sx={{ mb: 3 }}>
               
                    <Typography variant="h5" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                        <StarHalfIcon sx={{ mr: 2 }} />
                        Internship experience @ Codemancy Studio
                    </Typography>
                

                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> How long was your internship? </Typography>
                        <TextField name={""} style={{marginLeft:25}} label={"Duration of internship"} fullWidth />

                    </Grid>
                </Grid>

                <Box sx={{ mb: 3 }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} >JOB INTERVIEW AND SELECTION PROCESS</Divider>

                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> General impression of the job interview? </Typography>
                        <FormControl style={{alignItems : "column", justifyContent:"column"}}>
                            <RadioGroup style={{alignItems : "column", justifyContent:"column"}}
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                //value={value}
                                //onChange={handleChange}
                            >
                                <Grid  style={{display : "inline-block"}}>
                                    <FormControlLabel value="Positive" control={<Radio />} label="Positive" />
                                    <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
                                    <FormControlLabel value="Negative" control={<Radio />} label="Negative" />
                                </Grid>
                                
                                </RadioGroup>
                            </FormControl>
                    </Grid>
                    <br></br>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> How would you rate the difficulty of the job interview? </Typography>
                            <Select fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            //value={age}
                            //onChange={handleChange}
                            >
                            <MenuItem value={10}>Very Easy</MenuItem>
                            <MenuItem value={20}>Easy</MenuItem>
                            <MenuItem value={30}>About right</MenuItem>
                            <MenuItem value={40}>Difficult</MenuItem>
                            <MenuItem value={50}>Extremely difficult</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <br></br>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> How many weeks did the selection process last? </Typography>
                        <TextField name={""} label={"Duration of selection process"} fullWidth />

                    </Grid>

                </Box >

                <Paper sx={{ p: 3, mb: 4, backgroundColor:"#f3f3f3"}} style={{ display:"flex", flexDirection:"column", alignItems:"space-between" }}
                    variant="outlined">
                            <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> <LightbulbCircleIcon style={{color:"red"}}/> Remeber any interview questions? Please do share! </Typography>
                        <Grid>
                            <Button variant="contained" sx={{ mt: 2 }} startIcon={<AddBoxIcon/>} > Add Question</Button>
                        </Grid>
                </Paper>

                <Box sx={{ mb: 3 }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} >BRIEF SUMMARY OF YOUR EXPERIENCE WITH THE COMPANY</Divider>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                    
                    <Grid item xs={12}>
                        <TextField type="name" name={"employername"} label={"Positive experience"} fullWidth multiline rows={4}/>
                    </Grid>

                    <Grid item xs={12} >
                        <TextField type="name" name={"employername"} label={"Negative experience"} fullWidth multiline rows={4}/>
                    </Grid>
                    </Grid>


                </Box >
                <Box sx={{ mb: 3, position : "relative" }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} > RATINGS </Divider>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}} >
                        <Typography  component="subtitle1"  sx={{ m: 2 }}> Skill improvement </Typography>
                        <HoverRating />
                    </Grid>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  sx={{ m: 2 }}> Company Benefits </Typography>
                        <HoverRating />
                    </Grid>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1" align="center" sx={{ m: 2 }}> Overall Company Rating </Typography>
                        <HoverRating />
                    </Grid>
                    <Divider sx={{ mt: 5, mb: 3 }} > FINAL VERDICT </Divider>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> Would you recommend this internship? </Typography>
                        <FormControl style={{alignItems : "column", justifyContent:"column"}}>
                            <RadioGroup style={{alignItems : "column", justifyContent:"column"}}
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                //value={value}
                                //onChange={handleChange}
                            >
                                <Grid container style={{alignItems : "center", justifyContent:"center"}}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </Grid>
                                
                            </RadioGroup>
                    </FormControl>
                        
                    </Grid>
                    <Button variant="contained" endIcon={<SendIcon/>}> Submit rating </Button>
                </Box>
            </Paper>
               
            </React.Fragment>
        </Container>
    );
}