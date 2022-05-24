import { Button, Card, Divider, Typography, Grid, Checkbox } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function SmallInternshipCard({ title, companyName, description, showBookmark }) {
    return (
        <Card variant="outlined" sx={{ p: 3 }}>
            <Grid container>
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
            <Button sx={{ mb: -2 }}>View internship</Button>
        </Card>
    )
}