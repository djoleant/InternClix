import { Grid, Button, Typography } from "@mui/material"
import { useState } from "react"
import SkillBox from "./SkillBox"
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function ApplicantInfo({ applicantId, internshipSkills }) {

    const [applicant, setApplicant] = useState({
        //neki atributi...dobija se iz fetcha na osnovu applicantId
        skills: [
            { id: 0, label: 'Angular' },
            { id: 1, label: 'jQuery' },
            { id: 2, label: 'Polymer' },
            { id: 7, label: "Python" },
            { id: 8, label: "Java" }
        ]
    })

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sx={{ ml: 4 }}>
                <Typography align="left" sx={{ display: "flex", alignItems: "center", mb: 2 }}><CheckCircleRoundedIcon color="success" />English</Typography>
                <Typography align="left" sx={{ display: "flex", alignItems: "center", mb: 2 }}><CheckCircleRoundedIcon color="success" />Serbian</Typography>
                <Typography align="left" sx={{ display: "flex", alignItems: "center" }}><RemoveCircleRoundedIcon color="error" />Spanish</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
                <SkillBox
                    skills={
                        applicant.skills
                            .filter(s => internshipSkills.includes(s.label))
                            .map(s => s.label)
                    }
                    color="success"
                    title="Meets requirements:"
                    icon={<CheckCircleRoundedIcon />}
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <SkillBox
                    skills={
                        internshipSkills
                            .filter(s =>
                                !applicant.skills.map(s => s.label)
                                    .includes(s)
                            )
                    }
                    color="error"
                    title="Doesn't meet requirements:"
                    icon={<RemoveCircleRoundedIcon />}
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <SkillBox
                    skills={
                        applicant.skills
                            .map(s => s.label)
                            .filter(s =>
                                !internshipSkills
                                    .includes(s)
                            )
                    }
                    color="info"
                    title="Additional skills:"
                    icon={<InfoRoundedIcon />}
                />
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} md={8} sx={{ display: "flex", gap: 3 }}>
                    <Button
                        variant="outlined"
                        color="error"
                    >Deny Application</Button>

                    <Button
                        variant="outlined"
                        color="success"
                    >Accept Application</Button>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button
                        variant="contained"
                    >View applicant's CV</Button>
                </Grid>
            </Grid>
        </Grid>

    )
}