import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PeopleContent.style.css';

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

  let content = <p>Loading data...</p>;

  if (data && data.length > 0) {
    content = data.map((character, index) => (
      <div className="characterContainer" key={index + 1}>
        <div className="charInfo">
          <p>name: {character.name}</p>
          <p>gender: {character.gender}</p>
          <p>skinColor: {character.skin_color}</p>
          <p>eyeColor: {character.eye_color} </p>
        </div>
        <img
          className="characterImg"
          src={require('../../public/peopleImg/' +
            character.name +
            '.png')}
          alt=""
        />
      </div>
    ));
  } else {
    content = <div>Could not fetch any data.</div>;
  }
  return content;

  //   <div className="characterContainer">
  //     <img src={require('../../public/peopleImg/')} alt="" />
  //   </div>;
};
