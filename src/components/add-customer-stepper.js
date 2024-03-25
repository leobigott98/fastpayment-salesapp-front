import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CustomerForm from './add-customer-form';
import AddLocationForm from './add-location-form';
import RepresentativeForm from './add-representative-form';
import { useState } from 'react';


export default function ProgressMobileStepper() {
 /*  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    //  console.log(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //console.log('called!')
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    <CustomerForm handleStep={handleNext} handleStepBack={handleBack} activeStep={activeStep}/>,
    <RepresentativeForm handleStep={handleNext} handleStepBack={handleBack} activeStep={activeStep}/>,
    <AddLocationForm handleStep={handleNext} handleStepBack={handleBack} activeStep={activeStep}s/>
]; */

  return (
    
      {/* <Box sx={{  flexGrow: 1, m: 'auto'}}>
        <Box sx={{  width: '100%', p: 2}}>
          {steps[activeStep]}
        </Box>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        sx={{ width: '5%', flexGrow: 1, m: 'auto' }}  
      />
      </Box> */}
  );
}