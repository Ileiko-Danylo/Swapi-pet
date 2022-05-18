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

export const FilmsContent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios('https://swapi.dev/api/films/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((e) => console.error(e));
  }, []);

  const filmsWithImages = data ? (
    data.map((film) => ({
      title: film.title,
      opening_crawl: film.opening_crawl,
      director: film.director,
      release_date: film.release_date,
      img: require(`../../public/filmsImg/${film.title}.jpg`),
    }))
  ) : (
    <p>Loading data...</p>
  );

  const theme = useTheme();
  // console.log(theme);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = filmsWithImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (filmsWithImages && filmsWithImages.length > 0) {
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
            <b>{filmsWithImages[activeStep].title}</b>
          </Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {filmsWithImages.map((step, index) => (
            <div key={step.title}>
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
                      //   height: 613,
                      //   maxHeight: 613,
                      //   width: 800,
                      display: 'block',
                      overflow: 'hidden',
                      height: 600,
                      width: 400,
                    }}
                    src={step.img}
                    alt={step.title}
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
                      <b>opening_crawl</b>: {step.opening_crawl}
                    </p>
                    <p>
                      <b>director</b>: {step.director}
                    </p>
                    <p>
                      <b>release_date</b>: {step.release_date}
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
