import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  }
}));

function ProgressStepper() {
  const classes = useStyles();
  const { t } = useTranslation();
  const activeStep=useSelector(state=>state.stepper.activeStep)
  const steps = t('Stepper.steps',{returnObjects: true});
  return (
      <Stepper activeStep={activeStep} alternativeLabel className={classes.root} >
        {steps.map(step => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}

export default ProgressStepper;