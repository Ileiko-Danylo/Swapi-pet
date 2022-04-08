import { CategoryPicker } from './components/CategoryPicker';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import { AppBarText } from './components/AppBarText';

function App() {
  return (
    <Container>
      <AppBar>
        <ToolBar>
          <CategoryPicker />
          <AppBarText />
        </ToolBar>
      </AppBar>
    </Container>
  );
}

export default App;
