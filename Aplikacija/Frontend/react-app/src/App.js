import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";


const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#228a8a',
    },
    secondary: {
      main: '#f50057',
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

const themeOptions2 = createTheme({

  palette: {
    type: 'dark',
    primary: {
      main: '#050e16',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#0e113b',
      paper: '#1a237e',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(218,213,213,0.54)',
      disabled: '#d6d1d1',
      hint: '#ffebee',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },

});

const themeOptions3 = createTheme({



  palette: {
    type: 'light',
    primary: {
      main: '#050e16',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#fff59d',
      paper: '#888baa',
    },
    text: {
      primary: 'rgba(218,12,12,0.87)',
      secondary: 'rgba(218,213,213,0.54)',
      disabled: '#d6d1d1',
      hint: '#ffebee',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },


});


const themes = [themeOptions, themeOptions2, themeOptions3];

function App() {
  return (
    <div className="App">

      <ThemeProvider theme={themes[0]}>

        <Routes>
          <Route path="/SignIn" element={ <Header Component={SignIn}/>} />
        </Routes>

      </ThemeProvider>



    </div>
  );
}

export default App;
