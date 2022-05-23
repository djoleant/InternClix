import React, { useState } from 'react';
import { Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import DraftsIcon from '@mui/icons-material/Drafts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TechStack from './components/EmployerInfo/TechStack';
import InternshipCard from './components/EmployerInfo/InternshipCard';
import ExperienceCard from './components/EmployerInfo/ExperienceCard';

export default function EmployerInfoPage(props) {

    return (

        <Container component="main" style={{backgroundColor:"#fafafa"}} >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4}}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                        Codemancy Studio
                    </Typography>

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} > ABOUT US </Divider>
                            <Typography component="subtitle1"  align="center" sx={{ m: 2, color:"#bbbbbb" }}>
                                Codemancy Studio is a global software company. It is very cool. Much wow. It is very cool. Much wow. It is very cool. Much wow. It is very cool. Much wow. It is very cool. Much wow. It is very cool. Much wow. 
                                It is very cool. Much wow. It is very cool. Very Much wow. It is very cool. 
                            </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} > CONTACT INFO </Divider>
                        <Grid container style={{marginTop:2, display: "flex", flexDirection: "column" , alignItems: "flex-start" , marginLeft:100}} spacing={3} sx={{ mb: 4 }}>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 }}> <ApartmentIcon style={{color:"red"}}/> Bore Stankovic 10, Nis, Srbija </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 }}> <DraftsIcon style={{color:"red"}}/> randommail@gmail.com </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 }}> <PhoneIphoneIcon style={{color:"red"}}/> +3816638172 </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 }}> <PublicIcon style={{color:"red"}}/> http://codemancy.com/ </Typography>
                            
                        </Grid>
                        <Divider sx={{ mt: 5, mb: 3 }} > SOCIAL MEDIA LINKS </Divider>
                        <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
                            <Button sx={{m:1, borderRadius:50}} variant="contained" href="https://yahoo.com"> <FacebookIcon/> </Button>
                            <Button sx={{m:1, borderRadius:50}} variant="contained" href="https://yahoo.com"> <InstagramIcon/> </Button>
                            <Button sx={{m:1, borderRadius:50}} variant="contained" href="https://yahoo.com"> <TwitterIcon/> </Button>
                            <Button sx={{m:1, borderRadius:50}} variant="contained" href="https://yahoo.com"> <LinkedInIcon/> </Button>
                            <Button sx={{m:1, borderRadius:50}} variant="contained" href="https://yahoo.com"> <YouTubeIcon/> </Button>
                            
                        </Grid>
                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > TECH STACK </Divider>
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
                                <TechStack/>
                            </Grid>
                            
                        </Box>

                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > INTERNSHIP OFFERS </Divider>
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
                                <InternshipCard/>
                                <InternshipCard/>
                                <InternshipCard/>
                                <InternshipCard/>
                                
                            </Grid>
                        </Box>

                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > SHARED EXPERIENCES </Divider>
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}> 
                                <ExperienceCard/> 
                            </Grid>
                        </Box>

                    </Box>
                    
                </Paper>

            </React.Fragment>

        </Container >
    );
}