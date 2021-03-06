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

export const PeopleContent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios('https://swapi.dev/api/people/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((e) => console.error(e));
  }, []);

  const charactersWithImages = data ? (
    data.map((character) => ({
      name: character.name,
      gender: character.gender,
      skinColor: character.skin_color,
      eyeColor: character.skin_color,
      img: require(`../../public/peopleImg/${character.name}.png`),
    }))
  ) : (
    <p>Loading data...</p>
  );

  const theme = useTheme();
  // console.log(theme);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = charactersWithImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (charactersWithImages && charactersWithImages.length > 0) {
    return (
      <Box
        sx={{
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
          <Typography>{charactersWithImages[activeStep].name}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {charactersWithImages.map((step, index) => (
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
                      height: 613,
                      maxHeight: 613,
                      maxWidth: 400,
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.img}
                    alt={step.name}
                  />
                  <Box
                    sx={{
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
                      <b>gender</b>: {step.gender}
                    </p>
                    <p>
                      <b>skinColor</b>: {step.skinColor}
                    </p>
                    <p>
                      <b>eyeColor</b>: {step.eyeColor}
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
