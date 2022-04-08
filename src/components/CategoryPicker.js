import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

export const CategoryPicker = (props) => {
  const [data, setData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
              onClick={handleClose}
              key={category.id}
              value={category.id}
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
