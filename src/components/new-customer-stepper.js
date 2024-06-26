import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomerForm from "./add-customer-form";
import RepresentativeForm from "./add-representative-form";
import AddLocationForm from "./add-location-form";

export default function NewCustomerStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const steps = ["Información del Cliente", "Representante Legal", "Direcciones"];

  const stepComponents = [
    {
      key: 1,
      component: (
        <CustomerForm 
        handleStep={handleNext} 
        handleStepBack={handleBack} 
        activeStep={activeStep} />
      ),
    },
    {
      key: 2,
      component: (
        <RepresentativeForm
          handleStep={handleNext}
          handleStepBack={handleBack}
          activeStep={activeStep}
        />
      ),
    },
    {
      key: 3,
      component: (
        <AddLocationForm
          handleStep={handleNext}
          handleStepBack={handleBack}
          activeStep={activeStep}
          s
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper  activeStep={activeStep} sx={{m:2}}>
        {steps.map((label, index) => (
          <Step 
          key={label} 
          completed={completed[index]}>
            <StepButton 
            color="inherit" 
            onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {stepComponents[activeStep].component}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              
              <Box sx={{ flex: "1 1 auto" }} />
              
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                    <>
                  {/* <Typography variant="caption" sx={{ display: "inline-block" }}>
                    Paso {activeStep + 1} ya completado
                  </Typography> */}
                  </>
                ) : (
                  <>
                  {/* <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? "Enviar" : "Siguiente"}
                  </Button> */}
                  </>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
