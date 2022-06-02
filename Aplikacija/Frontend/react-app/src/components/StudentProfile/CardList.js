import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SmallInternshipCard from "./SmallInternshipCard";


export default function CardList({ type }) {
    const [internships, setInternships] = useState([]);

    const getInternships = async () => {
        let response;
        if (type === "internships") {
            response = await fetch("http://localhost:7240/Internship/GetStudentInternships", {
                credentials: "include"
            });
        }
        const data = await response.json();
        console.log(data)
        if (data.succeeded)
            setInternships(data.internships);
    }

    useEffect(() => {
        getInternships();
    }, [])

    return (
        <Grid container spacing={3}>
            {
                internships.map((internship, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <SmallInternshipCard {...internship} showBookmark={(type === "internships")} />
                    </Grid>
                ))
            }
        </Grid>
    )
}