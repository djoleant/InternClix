import { Button, Card, Divider, Typography, Grid, Checkbox, Avatar } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SkillChips from "../InternshipPage/SkillChips";
import { useNavigate } from "react-router-dom";

export default function SmallInternshipCard({
    title = "Title",
    companyName = "Company name",
    description = "Description...",
    showBookmark = false,
    duration,
    compensation,
    skills = [],
    location,
    link,
    time,
    banner,
    maxWidth = "100%"
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
            <Grid container>
                <Grid item xs={12}>
                    {(banner != undefined) ? banner : <></>}
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5" align="left">{title}</Typography>
                </Grid>
                <Grid item xs={2} sx={{ display: (showBookmark ? "flex" : "none"), flexDirection: "row-reverse" }}>
                    <Checkbox
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                    />
                </Grid>
            </Grid>

            <Divider />
            <Typography variant="subtitle1" align="left">{companyName}</Typography>
            <Grid container spacing={3}  >

                <Grid item xs={12} md={12}>
                    {(location !== undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <LocationOnIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {location}
                    </Typography> : <></>}
                    {(duration != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <QueryBuilderIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {duration + " " + (duration > 1 ? "weeks" : "week")}
                    </Typography> : <></>}
                    {(compensation != undefined) ? <Typography align="left" variant="body2" sx={{ m: 1, display: "flex", flexDirection: "row" }}>
                        <PaidIcon style={{ color: "red", marginRight: 5 }} fontSize="small" />
                        {"$ " + compensation}
                    </Typography> : <></>}
                    <SkillChips skills={skills} />

                </Grid>
            </Grid>
            <Typography
                align="left"
                variant="body2"
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    mb: 1
                }}
            >
                {description}
            </Typography>
            <Button sx={{ mb: -2 }} onClick={() => { if (link != undefined) navigate(link) }}>View internship</Button>
            {(time != undefined) ? time : <></>}
        </Card>
    )
}