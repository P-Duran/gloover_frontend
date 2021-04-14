import { createMuiTheme } from "@material-ui/core";

export const themeLight = createMuiTheme({
  typography: {
    fontFamily: "Nunito Sans, Roboto, sans-serif",
  },
  palette: {
    common: {
      black: "#4d4d4d",
    },
    background: {
      default: "#fcfcfc",
    },
    primary: {
      main: "#7575FD",
      light: "#BBBBFF",
    },
    secondary: {
      main: "#FFC107",
    },
    success: {
      main: "#00AB55",
      light: "#D6F2E3",
    },
    error: {
      main: "#FF504A",
      light: "#FFE1E0",
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        borderRadius: "0 10px 10px 0",
        paddingBottom: 10,
        borderLeft: "3px solid transparent",
        "&$selected": {
          backgroundColor: "transparent",
          borderLeft: "3px solid #7575FD",
          color: "#7575FD",
          "&:hover": {
            backgroundColor: "rgb(117, 117, 253, 0.1)",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "rgb(117, 117, 253, 0.1)",
          borderLeft: "3px solid rgb(117, 117, 253, 0.4)",
        },
      },
    },
  },
});

export const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
