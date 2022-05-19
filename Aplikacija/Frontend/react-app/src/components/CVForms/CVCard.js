import { Box, Typography, Grid, Divider } from "@mui/material";
import TextInputField from "../CVFormFields/TextInputField";
import TextField from '@mui/material/TextField';


export default function CVCard(props) {
    const { name, title, type } = props;
    return (
        <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 5, mb: 3 }} >{title}</Divider>

            <Grid container spacing={3}>
                {
                    (type == "work") ? (
                        <>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".title"} label={"Position*"} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".companyName"} label={"Company name*"} fullWidth />
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <TextInputField name={name + ".title"} label={"Title*"} fullWidth />
                        </Grid>

                    )
                }
                {
                    (type != "additional") ? (
                        <>
                            <Grid item xs={6}>
                                <TextInputField type="date" name={name + ".fromDate"} label={"From"} fullWidth InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextInputField type="date" name={name + ".toDate"} label={"To"} fullWidth InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                        </>
                    ) : (<></>)
                }

                <Grid item xs={12}>
                    <TextInputField name={name + ".description"} label={"Description"} fullWidth multiline rows={4} />
                </Grid>

            </Grid>
        </Box >
    );
}