import { Paper, Typography, Grid } from "@mui/material";
import TextInputField from "../CVFormFields/TextInputField";

export default function CVCard(props) {
    const { name, title } = props;
    return (
        <Paper sx={{ p: 3, mb: 3 }} variant="outlined">
            <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextInputField name={name + ".title"} label={"Title*"} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextInputField name={name + ".description"} label={"Description"} fullWidth multiline rows={4} />
                </Grid>
            </Grid>
        </Paper >
    );
}