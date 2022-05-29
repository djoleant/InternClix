import { Grid, Typography, Button, Divider, Box } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextInputField from '../CVFormFields/TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ChipTransferList from './ChipTransferList';



export default function Requirements({ skillData }) {

    const { values } = useFormikContext();

    const [categoryData/*, setChipData*/] = React.useState([ //ucitavanje iz baze
        { id: 0, label: 'Frontend developer' },
        { id: 1, label: 'Artificial Intelligence' },
        { id: 2, label: 'DevOps' },
        { id: 3, label: 'Machine Learning' },
        { id: 4, label: 'Embedded systems' },
        { id: 5, label: 'Computer Vision' },
        { id: 6, label: 'HCI' },
        { id: 7, label: 'Databases' }

    ]);


    return (
        <React.Fragment>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <Divider sx={{ mb: 3 }} >Internship Skills</Divider>
                        <ChipTransferList chipData={skillData} leftTitle={"Choose skills:"} rightTitle={"Added skills:"} fieldName={"skills"} />
                        <Divider sx={{ mt: 5, mb: 3 }} >Internship Categories</Divider>
                        <ChipTransferList chipData={categoryData} leftTitle={"Choose category of work:"} rightTitle={"Added categories:"} fieldName={"categories"} />
                        
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}
