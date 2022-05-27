import React, { useState, useEffect } from 'react';
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

    const getEmployerInfo = async () => {
        const response = await fetch("http://localhost:7240/Employer/GetEmployerInfo/Codemancy%20Studio", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setEmployerData(fetchData.employer);
        }

    }

    const getCategoryInfo = async () => {
        const response2 = await fetch("http://localhost:7240/Employer/GetEmployerCategories/Codemancy%20Studio", {
            credentials: "include"
        });
        if (response2.ok) {
            const fetchData2 = await response2.json();
            console.log(fetchData2);
            setCategoryData(fetchData2.categories);
        }

    }

    //const [skillData, setSkillData] = useState([]);
    const [employerData, setEmployerData] = useState({
        picture: "",
        companyName: "",
        about: "",
        likes:"",
        internships: [
            { id: "", title: "", description: "", compensation: "", duration: "", skills:[] }
        ],
        ratings: [{ id: "", overallScore: "", benefitsScore:"", skillImprovementScore:"", positiveExperience:"", negativeExperience:"", likes:"", dislikes:"" }],
       
    });

    const [categoryData, setCategoryData] = useState({
        
        categories: [{ name:"" }],
       
    });

    useEffect(() => {
        getEmployerInfo();
        getCategoryInfo();
    }, []);


    return (

        <Container component="main" style={{backgroundColor:"#fafafa"}} >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4}}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                        {employerData.companyName}
                    </Typography>

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} > ABOUT US </Divider>
                            <Typography component="h1"  align="center" sx={{ m: 2, color:"#bbbbbb" }}>
                                {employerData.about}
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
                                {/* {
                                    categoryData.categories.map(el=>{
                                        (<TechStack categories={el.ime}/>)
                                    })
                                } */}
                                <TechStack categories={categoryData.categories}/>
                            </Grid>
                            
                        </Box>

                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > INTERNSHIP OFFERS </Divider>
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
                                {/* Internship Cards */}
                                {
                                    employerData.internships.map(el=>
                                        (<InternshipCard title={el.title} description={el.description} duration={el.duration} compensation={el.compensation} skills={el.skills}/>)
                                    )
                                    
                                }
                                
                                
                            </Grid>
                        </Box>

                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > SHARED RATINGS </Divider>
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}> 
                                {employerData.ratings.map(el=>
                                        (<ExperienceCard id={el.id} overallScore={el.overallScore} benefitsScore={el.benefitsScore} skillImprovementScore={el.skillImprovementScore} positiveExperience={el.positiveExperience} negativeExperience={el.negativeExperience} recommended={el.recommended} likes={el.likes} dislikes={el.dislikes}/>)
                                    )
                                }
                            </Grid>
                        </Box>

                    </Box>
                    
                </Paper>

            </React.Fragment>

        </Container >
    );
}