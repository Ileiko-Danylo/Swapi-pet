import React, { useState } from 'react';
import { CategoryPicker } from './components/CategoryPicker';
import { Category } from './components/Category';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import { AppBarText } from './components/AppBarText';

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState('people');

  const categorySelectHandler = (event) => {
    const { myValue } = event.currentTarget.dataset;
    const categoryName = myValue;

    console.log(categoryName);
    setSelectedCategory(categoryName);
  };
  return (
    <Container>
      <AppBar>
        <ToolBar>
          <CategoryPicker
            selectedCategory={selectedCategory}
            onCategorySelect={categorySelectHandler}
          />
          <AppBarText />
        </ToolBar>
      </AppBar>

      <Category selectedCategory={selectedCategory} />
    </Container>
  );
}

export default App;
