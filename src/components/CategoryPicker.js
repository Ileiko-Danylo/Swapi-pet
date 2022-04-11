import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

export const CategoryPicker = (props) => {
  const [data, setData] = useState(null);

  const open = Boolean(props.anchorEl);

  const handleClick = (event) => {
    props.setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    axios('https://swapi.dev/api/')
      .then((response) => {
        setData(Object.entries(response.data));
      })
      .catch((e) => console.error(e));
  }, []);

  const selectedCategories = data
    ? data.map((category, index) => ({
        name: category[0],
        link: category[1],
        id: index + 1,
      }))
    : [];

  let content = <p>Loading categories...</p>;

  if (selectedCategories && selectedCategories.length > 0) {
    content = (
      <>
        <Button id="menu-button" onClick={handleClick}>
          <MenuIcon />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={props.anchorEl}
          open={open}
          // onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {selectedCategories.map((category) => (
            <MenuItem
              onClick={props.onCategorySelect}
              key={category.id}
              data-my-value={category.name}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  } else if (
    !selectedCategories ||
    selectedCategories.length === 0
  ) {
    content = (
      <MenuItem>Could not fetch any data.</MenuItem>
    );
  }

  return content;
};
