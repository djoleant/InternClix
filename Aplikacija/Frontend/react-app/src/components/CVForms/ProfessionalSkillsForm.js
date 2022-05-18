import { Grid, Typography, Button, Divider } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';


export default function ProfessionalSkillsForm(props) {
    const {
        formField: {
            email,
            phone,
            address,
            city

        },
        educationCount,
        setEducationCount
    } = props;
    const [chipData, setChipData] = React.useState([ //ucitavanje iz baze
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
        { key: 7, label: 'Polymer' },
        { key: 8, label: 'React' },
        { key: 9, label: 'Vue.js' },
        { key: 10, label: 'Angular' },
        { key: 11, label: 'jQuery' },
        { key: 12, label: 'Polymer' },
        { key: 13, label: 'React' },
        { key: 14, label: 'Vue.js' },
        { key: 15, label: 'Angular' },
        { key: 16, label: 'jQuery' },
        { key: 17, label: 'Polymer' },
        { key: 18, label: 'React' },
        { key: 19, label: 'Vue.js' },
    ]);
    const { values } = useFormikContext();
    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <MiscellaneousServicesRoundedIcon sx={{ mr: 2 }} />
                Profesional skills
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 3,
                            m: 0,
                            width: 1,
                            gap: 1,
                        }}
                        variant="outlined"
                    >
                        <FieldArray
                            name="skills"
                            render={(arrayHelpers) => (
                                <Grid container spacing={3}>

                                    <Grid item xs={12} md={6}>
                                        <Typography gutterBottom >
                                            Choose skills:
                                        </Typography>
                                        <Paper
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                listStyle: 'none',
                                                p: 3,
                                                m: 0,
                                                width: 1,
                                                gap: 1,
                                            }}
                                            variant="outlined"
                                        >
                                            {chipData.map((data) => {
                                                let icon;

                                                let selected = values.skills.find(skill => skill.key == data.key) != null;

                                                return (
                                                    <Chip
                                                        key={data.key}
                                                        icon={icon}
                                                        label={data.label}
                                                        onClick={() => {
                                                            if (!selected)
                                                                arrayHelpers.push(data);
                                                            //handleDelete(data);
                                                        }}
                                                        variant={selected ? "outlined" : "filled"}
                                                    /*onDelete={//handleDelete(data)}*/

                                                    />
                                                );
                                            })}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <Typography gutterBottom >
                                            My skills:
                                        </Typography>
                                        <Paper
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                listStyle: 'none',
                                                p: 3,
                                                m: 0,
                                                width: 1,
                                                gap: 1,
                                            }}
                                            variant="outlined"
                                        >
                                            {
                                                values.skills.map((skill, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={skill.label}
                                                        onDelete={() => { arrayHelpers.remove(index) }}

                                                    />
                                                ))
                                            }
                                        </Paper>
                                    </Grid>
                                </Grid>

                            )}
                        >

                        </FieldArray>
                    </Paper>
                </Grid >
                {
                    /*
                    <Grid item xs={12} >
                        <FieldArray
                            name="education"
                            render={(arrayHelpers) => (
                                <React.Fragment>
                                    {
                                        (() => {
                                            const fields = []
                                            for (let index = 0; index < educationCount; index++) {
                                                fields.push(
                                                    <React.Fragment key={index}>
                                                        <CVCard name={`education[${index}]`} title="Education" />
                                                    </React.Fragment>
                                                );
                                            }
                                            return fields;
                                        })()
                                    }
                                    <Button onClick={() => {
                                        arrayHelpers.push({
                                            title: "",
                                            description: "",
                                            fromDate: 0,
                                            toDate: 0
                                        });
                                        setEducationCount(educationCount + 1);
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
             
             
                                </Grid>*/
                }
            </Grid >
        </React.Fragment >
    );
}
