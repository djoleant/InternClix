import React, { useEffect, useState, createRef } from 'react';
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Divider,
    Box,
    Chip,
    ThemeProvider,
    createTheme
} from '@mui/material';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const studentInfo = {
    name: "Name",
    lastName: "Lastname",
    picture: ""
}

const info = {
    city: "City",
    address: "Street Name 99",
    phone: "+3812345678",
    skills: [
        { id: 1, label: "React" },
        { id: 2, label: ".NET" },
        { id: 3, label: "Angular" },
        { id: 4, label: "Node.js" },
        { id: 5, label: "Python" }
    ],
    languages: [
        { title: "Language 1", description: "Description1" },
        { title: "Language 2", description: "Description2" },
        { title: "Language 3", description: "Description3" },
    ],
    education: [
        { title: "School 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 1", fromDate: "1.1.2020.", toDate: "1.1.2021." },
        { title: "School 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 2", fromDate: "1.1.2020.", toDate: "1.1.2021." },
        { title: "School 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." }
    ],
    work: [
        { title: "Work 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 1", fromDate: "1.1.2020.", toDate: "1.1.2021." },
        { title: "Work 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 2", fromDate: "1.1.2020.", toDate: "1.1.2021." },
        { title: "Work 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." },
        { title: "Work 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." }
    ],
}

const calculateColor = (c) => {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >> 8) & 0xff;  // extract green
    var b = (rgb >> 0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 70) {
        return "white";
    }
    return "black";
}

export default function CVView({ refProp, displayOrder, accentColor, cvFont }) {
    //const ref = createRef();

    const theme = createTheme({
        typography: {
            fontFamily: cvFont
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ p: 3, width: 950, borderRadius: 0, border: "none" }} variant="outlined" ref={refProp}>
                <Grid container spacing={3} sx={{ backgroundColor: accentColor, borderRadius: "0px 0px 200px 0px", color: calculateColor(accentColor) }} >
                    <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Avatar src={studentInfo.picture} sx={{ width: 200, height: 200 }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='h2' align="left">Name Lastname</Typography>
                        <Divider sx={{ mb: 1, mt: 1 }}></Divider>
                        <Typography variant='h6' align="left">This is where the title of your CV goes</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={4} sx={{ backgroundColor: accentColor, pr: 3, pb: 5, borderRadius: "0px 0px 200px 0px", color: calculateColor(accentColor) }}>
                        <Box >
                            <Divider sx={{ mb: 5, mt: 10 }}>
                                <Typography variant='h6'>CONTACT INFO</Typography>
                            </Divider>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <LocalPhoneRoundedIcon />{info.phone}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmailRoundedIcon />user@example.com
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <HomeRoundedIcon />{info.address + ", " + info.city}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 5, mt: 10 }}>
                                <Typography variant='h6'>SKILLS</Typography>
                            </Divider>
                            <Box sx={{ display: "flex", /*flexDirection: "column",*/ justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                                {
                                    info.skills.map((skill, index) => (
                                        <Chip label={skill.label} key={index} sx={{ color: calculateColor(accentColor) }} />
                                    ))

                                }
                            </Box>
                            <Divider sx={{ mb: 5, mt: 10 }}>
                                <Typography variant='h6'>LNAGUAGES</Typography>
                            </Divider>
                            {
                                info.languages.map((lang, index) => (
                                    <Box sx={{ display: "flex" }} key={index}>
                                        <Typography sx={{ fontWeight: "bold", display: "flex" }} >
                                            {lang.title}  -
                                        </Typography>
                                        <Typography>{lang.description}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item container xs={8} >

                        {
                            renderWorkExperience(displayOrder)
                        }

                    </Grid>
                    {
                        renderWorkExperience(displayOrder == "work" ? "education" : "work")
                    }
                </Grid>

            </Paper >
        </ThemeProvider>
    )
}

function renderWorkExperience(order) {
    return (
        order == "work" ? (
            <Grid item xs={12}>
                <Divider sx={{ mb: 3, mt: 3 }}>
                    <Typography variant='h6' sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <WorkRoundedIcon />WORK EXPERIENCE
                    </Typography>
                </Divider>
                {
                    info.work.map((edu, index) => (
                        <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "bold" }} >
                                    {edu.fromDate + " -"}
                                </Typography>
                                <Typography sx={{ fontWeight: "bold" }} >
                                    {edu.toDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={10} sx={{ mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                <Divider ></Divider>
                                <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                <Typography align="left">{edu.description}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }

            </Grid>
        ) : (
            <Grid item xs={12}>
                <Divider sx={{ mb: 3 }}>
                    <Typography variant='h6' sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                        <SchoolRoundedIcon />EDUCATION
                    </Typography>
                </Divider>
                {
                    info.education.map((edu, index) => (
                        <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "bold" }} >
                                    {edu.fromDate + " -"}
                                </Typography>
                                <Typography sx={{ fontWeight: "bold" }} >
                                    {edu.toDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={10} sx={{ mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                <Divider ></Divider>
                                <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                <Typography align="left">{edu.description}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>

        )
    )
}