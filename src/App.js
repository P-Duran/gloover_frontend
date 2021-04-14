import './App.css';
import Scaffold from './scaffold/Scaffold';
import { BrowserRouter } from 'react-router-dom';
import { themeDark, themeLight } from 'theme/Theme';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <MuiThemeProvider theme={true ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <Scaffold></Scaffold>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
