import React from 'react';
import { Grid, Typography } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';


export default function PersonalInfoForm(props) {
    const {
        formField: {
            email,
            phone,
            address,
            city,

        }
    } = props;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal info
            </Typography>
            <Grid container spacing={3}>
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

            </Grid>
        </React.Fragment>
    );
}
