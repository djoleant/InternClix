import Container from '@mui/material/Container';
import React, { useState } from 'react';
import {
    Button,
    Typography
} from '@mui/material';
import { Paper, CssBaseline, Box, Divider, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';

export default function InternshipCard(props) {

    return (
        <Container component="main"  >
            <CssBaseline/>
            <React.Fragment>
                <Paper
                        sx={{ p:2, mb: 2, ml:2}}
                        variant="outlined"
                    >
                    
                    <Grid container style={{marginTop:3, marginLeft:3, display: "flex", flexDirection: "column" , alignItems: "flex-start" }} spacing={3} sx={{ mb: 4 }}>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1, fontWeight:"1000", fontSize:22}}> {props.title} </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1}}> {props.description} </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 , display: "flex", flexDirection: "row" , justifyContent:"center" }}> <LocationOnIcon style={{color:"red", marginRight:5}}/> Location </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 , display: "flex", flexDirection: "row" , justifyContent:"center" }}> <QueryBuilderIcon style={{color:"red", marginRight:5}}/> {props.duration +" "+ (props.duration > 1 ? "weeks":"week")}  </Typography>
                            <Typography  component="subtitle1"  align="center" sx={{ m: 1 ,  display: "flex", flexDirection: "row" , justifyContent:"center" }}> <PaidIcon style={{color:"red", marginRight:5}}/> {props.compensation +" $"}  </Typography>     

                            {/* //rip skills, mora opravim fetch */}
                            <Grid container style={{marginTop:3, display: "flex", flexDirection: "row" , justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                .Net
                            </Button>  
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                Android
                            </Button>  
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                Data Engineering & Analytics
                            </Button> 
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                DevOps
                            </Button>
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                QA Automation
                            </Button>    
                            <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                                JavaScript
                            </Button>    
                            </Grid>
                                
                    </Grid>
    

                    
                </Paper>
            </React.Fragment>

        </Container >
    );
}