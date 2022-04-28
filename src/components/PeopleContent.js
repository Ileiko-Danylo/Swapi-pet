import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  MobileStepper,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';
import './PeopleContent.style.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const PeopleContent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios('https://swapi.dev/api/people/')
      .then((response) => {
        setData(response.data.results);

        console.log('response data', response.data.results);
      })
      .catch((e) => console.error(e));
  }, []);

  const charactersWithImages = data ? (
    data.map((character) => ({
      name: character.name,
      gender: character.gender,
      skinColor: character.skin_color,
      eyeColor: character.skin_color,
      imgPath: require(`../../public/peopleImg/${character.name}.png`),
    }))
  ) : (
    <p>Loading data...</p>
  );

  console.log(charactersWithImages);

  const theme = useTheme();
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

  if (
    charactersWithImages &&
    charactersWithImages.length > 0
  ) {
    return (
      <Box
        sx={{
          maxWidth: 800,
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
            {charactersWithImages[activeStep].name}
          </Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={
            theme.direction === 'rtl' ? 'x-reverse' : 'x'
          }
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {charactersWithImages.map(
            (step, index) => (
              console.log('step', step),
              (
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
                        src={step.imgPath}
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
                        }}
                      >
                        <p>gender: {step.gender}</p>
                        <p>skinColor: {step.skinColor}</p>
                        <p>eyeColor: {step.eyeColor}</p>
                      </Box>
                    </Box>
                  ) : null}
                </div>
              )
            )
          )}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    );
  } else return 'loading data';

  // let content = <p>Loading data...</p>;

  // if (data && data.length > 0) {
  //   content = data.map((character, index) => (
  //     <div className="characterContainer" key={index + 1}>
  //       <div className="charInfo">
  //         <p>name: {character.name}</p>
  //         <p>gender: {character.gender}</p>
  //         <p>skinColor: {character.skin_color}</p>
  //         <p>eyeColor: {character.eye_color} </p>
  //       </div>
  //       <img
  //         className="characterImg"
  //         src={require('../../public/peopleImg/' +
  //           character.name +
  //           '.png')}
  //         alt=""
  //       />
  //     </div>
  //   ));
  // } else {
  //   content = <div>Could not fetch any data.</div>;
  // }
  return 'content';

  //   <div className="characterContainer">
  //     <img src={require('../../public/peopleImg/')} alt="" />
  //   </div>;
};
