import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { useState, useParams } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Radio,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton
} from '@mui/material';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RadioGroup from '@mui/material/RadioGroup';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HoverRating from './components/EmployerInfo/HoverRating';

export default function EmployerRatingPage(props) {
    const theme=useTheme();

    const { id } = useParams();

    const [textValue, setTextValue] = useState("");

    const [questionList, setquestionList] = useState([{question:""}]);

    const [experience, setExperience] = useState({positiveExperience:""}, {negativeExperience:""});

    const [durationSel, setDurationSel] = useState({durationSel:0});

    const [genImpression, setGenImpression] = useState({genImpression:""});

    const [jobInt, setJobInt] = useState({jobInt:""});

    const [recommend, setRecommend] = useState({recommend:""});

    const [rating, setRating] = useState({skillImprovement:0}, {benefits:0}, {overall:0});

     console.log(jobInt);

    // const getEmployerRating = async () => {
    //     const response = await fetch(
    //         "http://localhost:7240/Employer/AddRating/" + skillImprovement+"/"+benefits+"/"+overall+"/"+positiveExperience+"/"+negativeExperience+"/"+recommend+"/"+jobInt+"/"+genImpression+"/"+durationSel+"/"+id,
    //         {
    //             credentials: "include",
    //         }
    //     );
    //     if (response.ok) {
    //         const fetchData = await response.json();
    //         console.log(fetchData);
    //         //setEmployerData(fetchData.employer);
    //     }
    // };


    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");

    const handleQuestionAdd=()=>{
        setquestionList([...questionList, {question:""}])
    }

    const handleQuestionRemove=(index)=>{
        const list=[...questionList];
        list.splice(index, 1);
        setquestionList(list);
    }

    const handleQuestionChange=(event, index)=>{
        const {value, name}=event.target;
        const list=[...questionList];
        list[index][name]=value;
        setquestionList(list);
    }

    const handleExperienceChange=(event)=>{
        const {value, name}=event.target;
        const list=[experience];
        list[name]=value;
        setExperience(list);
    }

    const handleDurationSelChange=(event)=>{
        const {value, name}=event.target;
        const list=[durationSel];
        list[name]=value;
        setDurationSel(list);
    }

    const handleGenImpressionChange=(event)=>{
        const {value, name}=event.target;
        const list=[genImpression];
        list[name]=value;
        setGenImpression(list);
    }

    const handleJobIntChange=(event)=>{
        const {value, name}=event.target;
        const list=[jobInt];
        list[name]=value;
        setJobInt(list);
    }

    const handleRecommendChange=(event)=>{
        const {value, name}=event.target;
        const list=[recommend];
        list[name]=value;
        setRecommend(list);
    }

    const handleRatingChange=(event)=>{
        const {value, name}=event.target;
        const list=[rating];
        list[name]=value;
        setRating(list);
    }

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Rate your internship experience
                </Typography>
                <Paper
                    sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ?  "#3a3b3c":"whitesmoke", }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
                    Leave a public rating of your former/current employer in <span style={{color: 'red', fontWeight:'bold'}}> under 60 seconds! </span> The experience you share will prove valuable for other internship seekers looking for work!
                    </Typography>
                </Paper>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                <Grid container style={{alignItems : "center", justifyContent:"center"}} spacing={3} sx={{ mb: 3 }}>
               
                    <Typography variant="h5" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                        <StarHalfIcon sx={{ mr: 2 }} />
                        Internship experience @ Codemancy Studio
                    </Typography>
                

                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> How long was your internship? </Typography>
                        <TextField name={""} style={{marginLeft:25}} label={"Duration of internship"} fullWidth />

                    </Grid>
                </Grid>

                <Box sx={{ mb: 3 }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} >JOB INTERVIEW AND SELECTION PROCESS</Divider>

                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> General impression of the job interview? </Typography>
                        <FormControl style={{alignItems : "column", justifyContent:"column"}}>
                            <RadioGroup style={{alignItems : "column", justifyContent:"column"}}
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                //value={value}
                                onChange={handleGenImpressionChange}
                            >
                                <Grid  style={{display : "inline-block"}}>
                                    <FormControlLabel value="Positive" control={<Radio />} label="Positive" />
                                    <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
                                    <FormControlLabel value="Negative" control={<Radio />} label="Negative" />
                                </Grid>
                                
                                </RadioGroup>
                            </FormControl>
                    </Grid>
                    <br></br>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> How would you rate the difficulty of the job interview? </Typography>
                            <Select fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            //value={age}
                            onChange={handleJobIntChange}
                            >
                            <MenuItem value={"Very Easy"}>Very Easy</MenuItem>
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"About Right"}>About right</MenuItem>
                            <MenuItem value={"Difficult"}>Difficult</MenuItem>
                            <MenuItem value={"Extremely difficult"}>Extremely difficult</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <br></br>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography   align="center" sx={{ m: 2 }}> How many weeks did the selection process last? </Typography>
                        <TextField onChange={(event)=>handleDurationSelChange(event)} name={"durationSel"} label={"Duration of selection process"} fullWidth />

                    </Grid>

                </Box >

                <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ?  "#3a3b3c":"whitesmoke",}} style={{ display:"flex", flexDirection:"column", alignItems:"space-between" }}
                    variant="outlined">
                            <Typography  align="center" sx={{ m: 2 }}> <LightbulbCircleIcon style={{color:"red"}}/> Remeber any interview questions? Please do share! </Typography>
                        {
                            questionList.map((singleQuestion,index)=>(
                                <Grid>
                                {(questionList.length==1)?
                                (
                                    <Grid style={{display:"flex",flexDirection:"row"}}>
                                    <TextField name={"question"} value={singleQuestion.question} onChange={(event)=>handleQuestionChange(event,index)} style={{marginBottom:10, marginRight:5}} label={"Enter new interview question"} fullWidth />
                                    </Grid>
                                ):
                                (
                                    <Grid style={{display:"flex",flexDirection:"row"}}>
                                    <TextField name={"question"} value={singleQuestion.question} onChange={(event)=>handleQuestionChange(event,index)} style={{marginBottom:10, marginRight:5}} label={"Enter new interview question"} fullWidth />
                                    <IconButton aria-label="delete" onClick={()=>handleQuestionRemove(index)}>
                                    <DeleteIcon />
                                    </IconButton>
                                    </Grid>
                                    
                                )}
                                
                                {(questionList.length-1===index)?
                                (
                                    <Grid>
                                        <Button onClick={handleQuestionAdd} variant="contained" sx={{ mt: 2 }} startIcon={<AddBoxIcon/>} > Add Question</Button>
                                    </Grid>
                                ):""}
                                </Grid>
                            ))
                        }
                        
                </Paper>

                <Box sx={{ mb: 3 }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} >BRIEF SUMMARY OF YOUR EXPERIENCE WITH THE COMPANY</Divider>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                    
                    <Grid item xs={12}>
                        <TextField type="name" name={"positiveExperience"} label={"Positive experience"} onChange={(event)=>handleExperienceChange(event)} fullWidth multiline rows={4}/>
                    </Grid>

                    <Grid item xs={12} >
                        <TextField type="name" name={"negativeExperience"} label={"Negative experience"} onChange={(event)=>handleExperienceChange(event)} fullWidth multiline rows={4}/>
                    </Grid>
                    </Grid>


                </Box >
                <Box sx={{ mb: 3, position : "relative" }} variant="outlined">
                    <Divider sx={{ mt: 5, mb: 3 }} > RATINGS </Divider>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}} >
                        <Typography  component="subtitle1"  sx={{ m: 2 }}> Skill improvement </Typography>
                        <HoverRating />
                    </Grid>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  sx={{ m: 2 }}> Company Benefits </Typography>
                        <HoverRating />
                    </Grid>
                    <Grid container xs={12} style={{alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1" align="center" sx={{ m: 2 }}> Overall Company Rating </Typography>
                        <HoverRating />
                    </Grid>
                    <Divider sx={{ mt: 5, mb: 3 }} > FINAL VERDICT </Divider>
                    <Grid container xs={12} style={{top:10, alignItems : "center", justifyContent:"center"}}>
                        <Typography  component="subtitle1"  align="center" sx={{ m: 2 }}> Would you recommend this internship? </Typography>
                        <FormControl style={{alignItems : "column", justifyContent:"column"}}>
                            <RadioGroup style={{alignItems : "column", justifyContent:"column"}}
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                //value={value}
                                onChange={handleRecommendChange}
                            >
                                <Grid container style={{alignItems : "center", justifyContent:"center"}}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </Grid>
                                
                            </RadioGroup>
                    </FormControl>
                        
                    </Grid>
                    <Button onClick={() => { /*getEmployerRating*/ }}
                    variant="contained" endIcon={<SendIcon/>}> Submit rating </Button>
                </Box>
            </Paper>
               
            </React.Fragment>
        </Container>
    );
}