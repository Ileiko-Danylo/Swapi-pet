import React from 'react';

import './Category.style.css';

export const Category = (props) => {
  return (
    <div className="categoryContainer">
      <img
        src={require('../../public/categoryImg/' +
          props.selectedCategory +
          '.png')}
        alt=""
      />
      <p
        className={
          //   `${props.selectedCategory + 'Class'} `
          'textClass'
        }
      >
        {props.selectedCategory}
      </p>
    </div>
  );
};
