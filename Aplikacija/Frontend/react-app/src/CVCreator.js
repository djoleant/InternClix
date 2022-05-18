import { Paper, CssBaseline } from '@mui/material';
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
import cvFormModel from './components/CVFormModels/cvFormModel';
import PersonalInfoForm from './components/CVForms/PersonalInfoForm';
import ProfessionalSkillsForm from './components/CVForms/ProfessionalSkillsForm';




//import { theme, useStyle } from './styles';
const steps = ['Personal info', 'Work experience', 'Aditional info', 'Rewiew'];
const { formId, formField } = cvFormModel;



export default function CVCreator(props) {
    //const { children } = props;
    //const classes = useStyle();
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInfoForm formField={formField} />
            case 1:
                return <ProfessionalSkillsForm formField={formField} />;
            case 2:
                return <React.Fragment>Bla3</React.Fragment>;
            case 3:
                return <React.Fragment>Bla4</React.Fragment>;
            default:
                return <React.Fragment>Bla5</React.Fragment>;
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
                        <Typography component="h1" variant="h4" align="center">
                            Kraj
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
                                        { title: "", description: "" }
                                    ],
                                    skills: []
                                }
                            }
                            //validationSchema={currentValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={formId}>
                                    {_renderStepContent(activeStep)}

                                    <div >
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} >
                                                Back
                                            </Button>
                                        )}
                                        <div >
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"

                                            >
                                                {isLastStep ? 'Submit' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}

                                                />
                                            )}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>

        </Container >
    );
}
