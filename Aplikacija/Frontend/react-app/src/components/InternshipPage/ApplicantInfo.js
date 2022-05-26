import { Grid, Button, Typography } from "@mui/material"
import { useState } from "react"
import SkillBox from "./SkillBox"
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AcceptApplicationDialog from "../Dialogs/AcceptApplicationDialog";
import DenyApplicationDialog from "../Dialogs/DenyApplicationDialog";

export default function ApplicantInfo({ applicant, internshipSkills }) {



    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sx={{ ml: 4 }}>
                {
                    applicant.languages.map((language, index) => (
                        <Typography align="left" key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>{language.name}</Typography>

                    ))
                }
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
                    <DenyApplicationDialog name={applicant.name + " " + applicant.lastName} />

                    <AcceptApplicationDialog name={applicant.name + " " + applicant.lastName} />
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