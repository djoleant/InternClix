import React, { useState, useEffect } from 'react';
import { Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from '@mui/material/colors';
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import ComboBox from './components/ComboBox';
import { useNavigate } from "react-router-dom";
import InternshipCard from './components/InternshipCard';
import background from "./resources/stojny.jpg";


export default function Internships(props) {

    const [internshipData, setInternshipData] = useState(null);

    const [backgroundColor, setColor] = useState("blue");


    const getInternships = async () => {
        const response = await fetch(
            "http://localhost:7240/Internship/GetInternships",
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setInternshipData(fetchData.internships);
        }
    };

    const [search, setSearch] = useState("");

    useEffect(() => {
        getInternships();
        console.log("a");
    }, []);

    console.log(internshipData);

    const navigate = useNavigate();



    // const [cards, setCards] = React.useState([card]);


    return (

        <Container component="main" >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                    <Grid>
                        <Grid item xs={12} style={{ padding: "10px", maxWidth: 500 }}>
                            <TextField
                                onChange={(event) => { setSearch(event.target.value) }}
                                id="outlined-basic-email"
                                label="Search"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                    </Grid>


                    {/* <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >

                        <Grid item xs={3}>
                            <ComboBox />
                        </Grid>

                    </Grid> */}


                    {internshipData != null && (
                        <Grid container spacing={1}
                            alignItems="center"
                            justifyContent="center">

                            {internshipData.internships
                                .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((cards, index) => {
                                    const { title, description, duration, compensation, skills, categories } = cards;
                                    console.log(cards);
                                    return (<>
                                        <div> </div>
                                        <InternshipCard index={index} title={title} description={description} duration={duration} compensation={compensation} skills={skills} categories={categories} />
                                    </>

                                    );
                                })}
                        </Grid>
                    )}


                </Paper>

            </React.Fragment>

        </Container >
    );
}