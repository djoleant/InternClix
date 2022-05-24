import { Grid } from "@mui/material";
import SmallInternshipCard from "./SmallInternshipCard";

const internships = [
    { title: "internship1", companyName: "Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tincidunt elit. Nunc diam nulla, auctor ullamcorper vestibulum sed, scelerisque in metus. Morbi eget enim felis. Mauris efficitur metus ut tellus semper viverra. Nam faucibus libero maximus justo malesuada fringilla. Quisque vitae interdum justo, a convallis tellus." },
    { title: "internship1", companyName: "Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tincidunt elit. Nunc diam nulla, auctor ullamcorper vestibulum sed, scelerisque in metus. Morbi eget enim felis. Mauris efficitur metus ut tellus semper viverra. Nam faucibus libero maximus justo malesuada fringilla. Quisque vitae interdum justo, a convallis tellus." },
    { title: "internship1", companyName: "Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tincidunt elit. Nunc diam nulla, auctor ullamcorper vestibulum sed, scelerisque in metus. Morbi eget enim felis. Mauris efficitur metus ut tellus semper viverra. Nam faucibus libero maximus justo malesuada fringilla. Quisque vitae interdum justo, a convallis tellus." },
    { title: "internship1", companyName: "Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tincidunt elit. Nunc diam nulla, auctor ullamcorper vestibulum sed, scelerisque in metus. Morbi eget enim felis. Mauris efficitur metus ut tellus semper viverra. Nam faucibus libero maximus justo malesuada fringilla. Quisque vitae interdum justo, a convallis tellus." },
    { title: "internship1", companyName: "Company", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tincidunt elit. Nunc diam nulla, auctor ullamcorper vestibulum sed, scelerisque in metus. Morbi eget enim felis. Mauris efficitur metus ut tellus semper viverra. Nam faucibus libero maximus justo malesuada fringilla. Quisque vitae interdum justo, a convallis tellus." }
]

export default function CardList({ type }) {
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