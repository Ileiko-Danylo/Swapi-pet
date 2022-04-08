import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.style.css';

export const Category = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios('https://swapi.dev/api/' + props.selectedCategory)
      .then((response) => {
        console.log('response data', response.data.results);
        setData(response.data.results);
      })
      .catch((e) => console.error(e));
  }, [props.selectedCategory]);

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
