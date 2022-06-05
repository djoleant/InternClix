//to be implemented
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
import Statistics from "./components/AboutUs/Statistics";

export default function HomePage(props) {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
      <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
        <Grid fullwidth style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start", backgroundColor:"whitesmoke", height:400, marginBottom:20}}>
          <Typography style={{color:"#f50057",marginBottom:100, fontSize:50, fontWeight:800, marginLeft:20, marginTop:20}}>We Do IT Better.</Typography>
          <Statistics/>
        </Grid>
        <Grid fullwidth style={{display:"flex", flexDirection:"row", height:400}}>
          <Grid fullwidth style={{ width:"50%", backgroundColor:"whitesmoke", marginRight:10}}> 
            <Typography fullwidth style={{fontSize:20, fontWeight:1000,backgroundColor:"#f50057"}}> STUDENT </Typography>
            <Grid style={{display:"flex", flexDirection:"row"}}>
            <Avatar
                      variant="rounded"
                      alt="Remy Sharp"
                      src="/resources/student1.jpg"
                      sx={{ width: 200, height: 200, marginRight:4, marginTop:14, justifySelf:"flex-end"}}
                      />
            <Grid style={{alignSelf:"center", width:"60%", marginTop:5}}>
              <Typography style={{fontSize:20}}>Register as a student and: </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • View internship offers </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • Chat with employers </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • Rate employers </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • See internship compatibility </Typography>
              <Button size="large" variant="contained" style={{marginTop:40}}>Register as student</Button>
            </Grid>
            </Grid>
          </Grid>
          <Grid fullwidth style={{ width:"50%", backgroundColor:"whitesmoke", marginLeft:10}}>
          <Typography fullwidth style={{fontSize:20, fontWeight:1000,backgroundColor:"#618fba"}}> EMPLOYER </Typography>
          <Grid style={{display:"flex", flexDirection:"row"}}>
            <Grid style={{alignSelf:"center", justifyConntent:"flex-start",height:"80%", /*backgroundColor:"lightgrey"*/ marginLeft:20, width:"55%", marginTop:5}}>
              <Typography style={{fontSize:20}}>Register as an employer and: </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • Post internship offers </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • Hire prospective students </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • See company ratings </Typography>
              <Typography style={{marginLeft:4, fontSize:18}}> • Something 4 </Typography>
              <Button size="large" variant="contained" style={{backgroundColor:"#f50057", marginTop:40}}>Register as employer</Button>
            </Grid>
            <Avatar
                      variant="rounded"
                      alt="Remy Sharp"
                      src="/resources/employer1.jpg"
                      sx={{ width: 200, height: 200, marginRight:1, marginTop:14, justifySelf:"flex-end"}}
                      />
                      
            </Grid>
          </Grid>
        </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );

}