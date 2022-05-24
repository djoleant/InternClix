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



export default function StudentProfilePage() {

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

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src="" sx={{ width: 140, height: 140 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">Name Lastname</Typography>
                    <Typography align="left">username</Typography>
                    <Typography align="left">user@example.com</Typography>

                </Grid>
            </Grid>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="CV Overview" />
                        <Tab label="My internships" />
                        <Tab label="Wishlist" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CVInfo />
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