import { Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import MatchPercentage from "./MatchPercentage";
import ApplicantInfo from "./ApplicantInfo";


export default function ApplicantList({ internshipId,internshipSkills }) {

    const [applicants, setApplicants] = useState([ //dobija se iz fetcha na osnovu internshipId
        { id: "abcd123", name: "Name1", lastName: "Lastname1", match: 95 },
        { id: "abcd124", name: "Name2", lastName: "Lastname2", match: 85 },
        { id: "abcd125", name: "Name3", lastName: "Lastname3", match: 75 },
        { id: "abcd126", name: "Name4", lastName: "Lastname4", match: 65 },
        { id: "abcd127", name: "Name5", lastName: "Lastname5", match: 55 },
        { id: "abcd128", name: "Name6", lastName: "Lastname6", match: 45 },
        { id: "abcd129", name: "Name7", lastName: "Lastname7", match: 35 },
        { id: "abcd128", name: "Name6", lastName: "Lastname6", match: 25 },
        { id: "abcd129", name: "Name7", lastName: "Lastname7", match: 15 }
    ]);
    const navigate = useNavigate();

    return (
        <Grid container sx={{ width: 1 }}>

            <Grid item container xs={12}>

                {
                    applicants.map((applicant, index) => (
                        <Accordion variant="outlined" sx={{ width: 1 }} key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
                                    <Typography>
                                        {(index + 1) + ")  " + applicant.name + " " + applicant.lastName}
                                    </Typography>
                                    <Box sx={{ width: "25%" }}>
                                        <MatchPercentage value={applicant.match} />
                                    </Box>

                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApplicantInfo internshipSkills={internshipSkills}/>
                            </AccordionDetails>
                        </Accordion >
                    ))
                }

            </Grid>

        </Grid>
    )
}