import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Typography,
    CircularProgress,
    Avatar,
    Grid,
    useTheme
} from '@mui/material';
import ApplicantList from './components/InternshipPage/ApplicantList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SkillChips from './components/InternshipPage/SkillChips';



export default function EmployerInternsipPage() {

    const theme = useTheme();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                sx={{ width: 1 }}
            >
                {value === index && (
                    <Box sx={{ p: 3, width: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [internship, setInternship] = useState({
        title: "Internship title",
        description: "This is where the description of this internship goes",
        picture: "",
        duration: 10,
        location: "Street Name 99, City",
        compensation: 250,
        skills: [
            { id: 0, label: 'Angular' },
            { id: 1, label: 'jQuery' },
            { id: 2, label: 'Polymer' },
            { id: 3, label: 'React' },
            { id: 4, label: '.NET' },
            { id: 5, label: 'Node.js' }
        ]
    })

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src={internship.picture} alt="Logo" sx={{ width: 140, height: 140 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">{internship.title}</Typography>
                    <Typography align="left">{internship.description}</Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <LocationOnIcon style={{ color: "red", marginRight: 5 }} /> {internship.location} </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <QueryBuilderIcon style={{ color: "red", marginRight: 5 }} /> {internship.duration + " " + (internship.duration > 1 ? "weeks" : "week")}  </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <PaidIcon style={{ color: "red", marginRight: 5 }} /> {internship.compensation + " $"}  </Typography>
                    <SkillChips skills={internship.skills} />

                </Grid>
            </Grid>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Overview" />
                        <Tab label="Applicants" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Ovde dodati detalje o internshipu i po mogucstvu mogucnost izmene
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ApplicantList internshipSkills={internship.skills.map(s => s.label)} />
                </TabPanel>


            </Box>

        </Container >
    );
}
