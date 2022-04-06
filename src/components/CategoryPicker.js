import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CategoryPicker = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios('https://swapi.dev/api/')
      .then((response) => {
        setData(Object.keys(response.data));
      })
      .catch((e) => console.error(e));
  }, []);

  const selectedCategories = data
    ? data.map((category, index) => ({
        name: category,
        id: index + 1,
      }))
    : [];

  let content = <p>Loading categories...</p>;

  if (selectedCategories && selectedCategories.length > 0) {
    content = (
      <select>
        {selectedCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !selectedCategories ||
    selectedCategories.length === 0
  ) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};
