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
import CVInfo from './components/StudentProfile/CVInfo';
import CardList from './components/StudentProfile/CardList';
import { useParams } from 'react-router-dom';



export default function StudentProfilePage({ type }) {

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

    const [info, setInfo] = useState();

    const { id } = useParams();

    const getInfo = async () => {
        const response = await fetch("http://localhost:7240/CV/GetCV?studentId=" + id, {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
            if (fetchData.cv.education.length > 0) {
                setInfo(fetchData.cv);
            }
        }

    }

    useEffect(() => {
        getInfo();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src="" sx={{ width: 140, height: 140 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">{info != undefined ? info.name + " " + info.lastName : ""}</Typography>
                    <Typography align="left">{info != undefined ? info.userName : ""}</Typography>
                    <Typography align="left">{info != undefined ? info.email : ""}</Typography>

                </Grid>
            </Grid>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="CV Overview" />
                        <Tab label="My internships" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Wishlist" sx={{ display: type === "public" ? "none" : "" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CVInfo cvInfo={info} type={type} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CardList type="internships" />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CardList type="wishlist" />
                </TabPanel>

            </Box>

        </Container >
    );
}
