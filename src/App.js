import './App.css';
import Scaffold from './scaffold/Scaffold';
import { BrowserRouter } from 'react-router-dom';
import { themeDark, themeLight } from 'theme/Theme';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { GlobalContextProvider } from 'context/GlobalContextProvider'

function App() {
  return (
    <MuiThemeProvider theme={true ? themeLight : themeDark}>
      <GlobalContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <Scaffold></Scaffold>
        </BrowserRouter>
      </GlobalContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
