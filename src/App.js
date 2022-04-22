import React, { useState } from 'react';
import { CategoryPicker } from './components/CategoryPicker';
import { Category } from './components/Category';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import { AppBarText } from './components/AppBarText';
import { PeopleContent } from './components/PeopleContent';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] =
    useState('people');

  const categorySelectHandler = (event) => {
    const { myValue } = event.currentTarget.dataset;
    const categoryName = myValue;
    setAnchorEl(null);

    setSelectedCategory(categoryName);
  };
  return (
    <Container>
      <AppBar>
        <ToolBar>
          <CategoryPicker
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            selectedCategory={selectedCategory}
            onCategorySelect={categorySelectHandler}
          />
          <AppBarText />
        </ToolBar>
      </AppBar>

      <Category selectedCategory={selectedCategory} />
      <PeopleContent />
    </Container>
  );
}

export default App;
