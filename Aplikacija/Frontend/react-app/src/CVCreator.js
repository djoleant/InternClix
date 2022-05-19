import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { Formik, Form } from 'formik';
import PersonalInfoForm from './components/CVForms/PersonalInfoForm';
import ProfessionalSkillsForm from './components/CVForms/ProfessionalSkillsForm';
import WorkExperienceForm from './components/CVForms/WorkExperienceForm';
import AdditionalInfoForm from './components/CVForms/AdditionalInfoForm';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';




//import { theme, useStyle } from './styles';
const steps = ['Personal info', 'Professional skills', "Work experience", 'Aditional info'];



export default function CVCreator(props) {
    //const { children } = props;
    //const classes = useStyle();
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInfoForm />
            case 1:
                return <ProfessionalSkillsForm />;
            case 2:
                return <WorkExperienceForm />;
            case 3:
                return <AdditionalInfoForm />;
            default:
                return <React.Fragment>Not Found</React.Fragment>;
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    //const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
        alert("Objekat je u console log")
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    CV Creator
                </Typography>
                <Stepper activeStep={activeStep} >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {
                                    <Typography sx={{
                                        display: { xs: 'none', md: "block" },
                                    }}>
                                        {label}
                                    </Typography>
                                }
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <Typography component="h1" variant="h2" align="center">
                            <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: 100, mt: 10 }} />
                            <br />
                            CV successfully created
                        </Typography>
                    ) : (
                        <Formik
                            initialValues={
                                {
                                    phone: "",
                                    address: "",
                                    city: "",
                                    email: "",
                                    education: [
                                        { title: "", description: "", fromDate: "", toDate: "" }
                                    ],
                                    skills: [],
                                    categories: [],
                                    languages: [{ name: "", description: "" }],
                                    experience: [
                                        { title: "", description: "", companyName: "", fromDate: "", toDate: "" }
                                    ],
                                    additionalInfo: []
                                }
                            }
                            //validationSchema={currentValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"cvForm"}>
                                    {_renderStepContent(activeStep)}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            mb: 5
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} variant="outlined" size="large" >
                                                Back
                                            </Button>
                                        )}
                                        <div >
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"

                                            >
                                                {isLastStep ? 'Submit' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{ ml: 4 }}

                                                />
                                            )}
                                        </div>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>

        </Container >
    );
}
