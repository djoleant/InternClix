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

export default function Internships(props) {

    const getInternships = async () => {
        const response = await fetch("http://localhost:7240/Internship/GetInternship", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setInternship(fetchData.internship);
        }

    }

    const [internshipData, setInternship] = useState({
        title: "",
        description: "",
        duration: "",
        compensation: "",
        skills: [
            { id: "", name: [] }
        ],
        categories: [
            { id: "", name: [] }
        ],

    });

    useEffect(() => {
        getInternships();
    }, []);

    const card = {
        name: "Data Science Intern",
        description:
            "We are looking for ambitious data science interns. Expand your knowledge and get hired. Don't waste time and apply now!",
        duration: "3 months",
        compensation: "300 eur",
        //skills ?
        //categories ?

    };
    const [cards, setCards] = React.useState([card]);


    return (

        <Container component="main" >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                    {/* <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Search" variant="outlined" />

                    </Box> */}

                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >

                        <Grid item xs={3}>
                        <ComboBox />
                        </Grid>

                    </Grid>


                    {/* <Box alignItems="center"
                        justifyContent="center">
                        <ComboBox />
                    </Box> */}

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} > Available internships </Divider>
                        <Typography component="h1" align="center" sx={{ m: 2, color: "#bbbbbb" }}>
                            {internshipData.about}
                        </Typography>
                    </Box>


                    <Grid container spacing={1}
                        alignItems="center"
                        justifyContent="center">
                        {cards.map((cards, index) => {
                            const { image, name, description, duration, compensation } = cards;
                            return (
                                <Grid item>
                                    <Card key={index}>
                                        {/* <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    ES
                                                </Avatar>
                                            }
                                            
                                            title="Empcode solutions"
                                        //subheader="moze i ne mora da bude ovo"
                                        /> */}
                                        <CardMedia image={image} />
                                        <CardContent >

                                            <Typography
                                                className={"MuiTypography--heading"}
                                                variant={"h6"}
                                                gutterBottom
                                            >
                                                {name}
                                            </Typography>
                                            <Typography display="block"
                                                className={"MuiTypography--subheading"}
                                                variant={"caption"}

                                            >
                                                {description}
                                            </Typography>
                                            <Typography display="block"
                                                className={"MuiTypography--subheading"}
                                                variant={"body2"}
                                            >
                                                {duration}
                                            </Typography>
                                            <Typography
                                                className={"MuiTypography--subheading"}
                                                variant={"substring2:h6"}
                                            >
                                                {compensation}
                                            </Typography>

                                        </CardContent>
                                        <Grid container style={{ marginTop: 3, display: "flex", flexDirection: "row", justifyContent: "center" }} spacing={3} sx={{ mb: 2 }}>
                                            <Button style={{ marginLeft: 7, marginTop: 7 }} variant="contained" >
                                                React
                                            </Button>
                                            <Button style={{ marginLeft: 7, marginTop: 7 }} variant="contained" >
                                                .NET
                                            </Button>
                                            <Button style={{ marginLeft: 7, marginTop: 7 }} variant="contained" >
                                                NodeJS
                                            </Button>
                                        </Grid>
                                        <Divider light />
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Apply
                                            </Button>
                                            <Button size="small" color="primary">
                                                Add to favorites
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                </Paper>

            </React.Fragment>

        </Container >
    );
}