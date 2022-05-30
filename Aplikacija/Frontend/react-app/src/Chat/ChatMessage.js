import { Grid, ListItem, ListItemText, Paper, Box, useTheme } from "@mui/material"

export default function ChatMessage({ content, time, align, type }) {

    const theme = useTheme();

    //console.log(type);

    return (
        <Box sx={{ width: 1, display: "flex", flexDirection: ((align == "right") ? "row-reverse" : "row") }}>
            <Paper align="right" variant="outlined" sx={{ width: "fit-content", m: 1, backgroundColor: (align == "left") ? theme.palette.primary.main : "" }}>
                <ListItem key="1">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align={align} primary={content} sx={{ color: (align == "left" ? "white" : "") }}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align={align} secondary={time} sx={{ color: (align == "left" ? "white" : "") }}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </Paper>
        </Box>
    )
}