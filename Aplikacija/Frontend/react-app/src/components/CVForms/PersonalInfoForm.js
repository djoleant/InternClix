import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


export default function PersonalInfoForm(props) {
    const {
        formField: {
            email,
            phone,
            address,
            city

        },
        education,
        setEducation
    } = props;

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Personal info
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                    <TextInputField name={address.name} label={address.label} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextInputField name={city.name} label={city.label} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextInputField type="number" name={phone.name} label={phone.label} fullWidth />
                </Grid>

                <Grid item xs={12} >
                    <TextInputField name={email.name} label={email.label} fullWidth />
                </Grid>
                <Grid item xs={12} >
                    <FieldArray
                        name="education"
                        render={(arrayHelpers) => (
                            <React.Fragment>
                                {
                                    education.map((edu, index) => (
                                        <React.Fragment key={index}>
                                            <CVCard name={`education[${index}]`} title="Education" />
                                        </React.Fragment>
                                    ))
                                }
                                <Button onClick={() => {
                                    arrayHelpers.push({
                                        title: "",
                                        description: "",
                                        fromDate: 0,
                                        toDate: 0
                                    });
                                    setEducation([...education, {
                                        title: "",
                                        description: "",
                                        fromDate: 0,
                                        toDate: 0
                                    }]);
                                }
                                }
                                    variant="outlined"
                                    startIcon={<AddCircleRoundedIcon />}
                                >
                                    Add education
                                </Button>
                            </React.Fragment>

                        )}
                    >

                    </FieldArray>


                </Grid>
            </Grid>
        </React.Fragment>
    );
}
