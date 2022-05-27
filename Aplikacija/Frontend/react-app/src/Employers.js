import React, { useState, useEffect } from "react";
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import ComboBox from "./components/ComboBox";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function Employers(props) {
  const getEmployers = async () => {
    const response = await fetch(
      "http://localhost:7240/Employer/GetEmployers",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setEmployerData(fetchData.employers);
    }
  };

  const [employerData, setEmployerData] = useState({
    employers: [
      {
        picture: "",
        companyName: "",
        about: "",
        address:"",
        likes: "",
        email:"",
        internships:"",
        ratings:[{overallScore:""}]
      },
    ],
  });

  useEffect(() => {
    getEmployers();
  }, []);

//   const card = {
//     companyName:"Codemancy Studio",
//     about:"Cool employer",
//     likes:"3",
//     internships:"3"
//     //skills ?
//     //categories ?
//   };
//   const [cards, setCards] = React.useState([card]);

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
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

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 5, mb: 3 }}> EMPLOYERS </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >
              
            </Typography>
          </Box>

          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            {employerData.employers.map((card, index) => {
              
              return (
                <Grid item >
                  <Card key={index} style={{width:350, height:200}}>
                    
                    <CardMedia />
                    <CardContent>
                      <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                      >
                        
                      </Typography>
                      <Typography
                        display="block"
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                      >
                        
                      </Typography>
                      <Typography
                        display="block"
                        className={"MuiTypography--subheading"}
                        variant={"body2"}
                      >
                        
                      </Typography>
                      <Typography
                        className={"MuiTypography--subheading"}
                        variant={"substring2:h6"}
                      >
                        
                      </Typography>
                    </CardContent>
                    <Grid
                      container
                      style={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                      spacing={3}
                      sx={{ mb: 2 }}
                    >
                      <Button variant="contained" disabled> {card.internships} {card.internships=="1"?"internship":"internships"} </Button>
                      {
                        (<Button variant="contained" disabled style={{marginLeft:5}} >  {card.ratings.length>0?card.ratings.reduce((a,b)=>a.overallRating+b,0)/card.ratings.length:"0"} <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} /> </Button>)
                      }
                    </Grid>
                    <Divider light />
                    <CardActions style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                      <Typography style={{textAlign:"center", fontWeight:"1000", marginLeft:7}}>{card.companyName}</Typography>
                      <Typography style={{textAlign:"center"}}>{card.about}</Typography>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
