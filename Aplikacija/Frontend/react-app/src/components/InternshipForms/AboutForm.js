import React, { useState } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

export default function AboutForm() {


    const { values } = useFormikContext();
    

    return (
        <React.Fragment>
            {/* <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <AccountCircleRoundedIcon sx={{ mr: 2 }} />
                About internship
            </Typography> */}
            <Paper
                sx={{ p: 3, mb: 4 }}
                variant="outlined"
            >
                <Divider sx={{ mb: 3 }} >New Internship</Divider>
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12}>
                        <TextInputField name={"title"} label={"Title"} fullWidth />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextInputField name={"description"} label={"Description"} fullWidth />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"duration"} label={"Duration"} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"compensation"} label={"Compensation"} fullWidth />
                    </Grid>
                    
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
