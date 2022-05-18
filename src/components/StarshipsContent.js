import React, { useEffect, useState } from 'react';
import {
  useTheme,
  // createTheme,
} from '@mui/material/styles';
import {
  MobileStepper,
  Box,
  Paper,
  Typography,
  Button,
  // Grid,
} from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const StarshipsContent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios('https://swapi.dev/api/starships/')
      .then((response) => {
        setData(response.data.results.slice(0, 5));
      })
      .catch((e) => console.error(e));
  }, []);

  const starshipsWithImages = data ? (
    data.map((starship) => ({
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      cost_in_credits: starship.cost_in_credits,
      crew: starship.crew,
      max_atmosphering_speed: starship.max_atmosphering_speed,
      img: require(`../../public/starshipsImg/${starship.name}.${'jpg' || 'jpeg'}`),
    }))
  ) : (
    <p>Loading data...</p>
  );
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = starshipsWithImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (starshipsWithImages && starshipsWithImages.length > 0) {
    return (
      <Box
        sx={{
          //   maxWidth: 800,
          flexGrow: 1,
          p: 1,
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>
            <b>{starshipsWithImages[activeStep].name}</b>
          </Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {starshipsWithImages.map((step, index) => (
            <div key={step.name}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      height: 600,
                      maxWidth: 8000,
                    }}
                    src={step.img}
                    alt={step.name}
                  />
                  <Box
                    sx={{
                      maxWidth: 400,
                      textTransform: 'uppercase',
                      color: '',
                      pl: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      // palette: {
                      //   primary: {
                      //     main: '#1b2a7f',
                      //   },
                      //   secondary: {
                      //     main: '#edf2ff',
                      //   },
                      // },
                    }}
                  >
                    <p>
                      <b>model</b>: {step.model}
                    </p>
                    <p>
                      <b>manufacturer</b>: {step.manufacturer}
                    </p>
                    <p>
                      <b>cost in credits</b>: {step.cost_in_credits}
                    </p>
                    <p>
                      <b>crew</b>: {step.crew}
                    </p>
                    <p>
                      <b>max atmosphering speed</b>: {step.max_atmosphering_speed}
                    </p>
                  </Box>
                </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    );
  } else return 'loading data';
};
