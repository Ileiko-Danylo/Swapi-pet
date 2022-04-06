import React from 'react';

export const CategoryPicker = (props) => {
  const data = [
    'people',
    'planets',
    'films',
    'species',
    'vehicles',
    'starships',
  ];

  const selectedCategories = data
    ? data.map((category, index) => ({
        name: category,
        id: index + 1,
      }))
    : [];
  console.log('data', data);
  console.log(selectedCategories);

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
