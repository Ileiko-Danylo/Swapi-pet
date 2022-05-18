import React from 'react';
import { PeopleContent } from './PeopleContent';
import { FilmsContent } from './FilmsContent';
import { PlanetsContent } from './PlanetsContent';
import { SpeciesContent } from './SpeciesContent';
import { VehiclesContent } from './VehiclesContent';
import { StarshipsContent } from './StarshipsContent';

export const ContentContainer = (props) => {
  const categoriesMapping = {
    people: <PeopleContent />,
    planets: <PlanetsContent />,
    films: <FilmsContent />,
    species: <SpeciesContent />,
    vehicles: <VehiclesContent />,
    starships: <StarshipsContent />,
  };

  if (props.selectedCategory) {
    for (const [key, value] of Object.entries(categoriesMapping)) {
      if (props.selectedCategory === key) {
        return value;
      }
    }
  }
};
