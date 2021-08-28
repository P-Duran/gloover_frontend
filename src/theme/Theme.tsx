import { createMuiTheme } from "@material-ui/core";
//7575FD
export const themeLight = createMuiTheme({
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
  palette: {
    purple: {
      main: "#ff18ec",
      light: "#ffe0fd",
    },
    orange: {
      main: "#ff5d18",
      light: "#ff5d18",
    },
    common: {
      black: "#4d4d4d",
    },
    background: {
      default: "#fcfcfc",
    },
    primary: {
      main: "#6060bf",
      light: "#BBBBFF",
    },
    secondary: {
      main: "#FFC107",
      light: "#fff3cd",
    },
    success: {
      main: "#00AB55",
      light: "#D6F2E3",
    },
    info: {
      main: "#1890ff",
      light: "#ecf6ff",
    },
    error: {
      main: "#FF504A",
      light: "#FFE1E0",
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        borderRadius: "10px",
        padding: 10,
        marginBottom: 5,
        borderLeft: "3px solid transparent",
        "&$selected": {
          borderRadius: "10px",
          backgroundColor: "#6060bf",
          color: "white",
          "&:hover": {
            borderRadius: "10px",
            backgroundColor: "#6060bf",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "rgb(117, 117, 253, 0.1)",
        },
      },
    },
  },
});

export const themeDark = createMuiTheme({
  palette: {
    purple: {
      main: "#ff18ec",
      light: "#ffe0fd",
    },
    orange: {
      main: "#ff18ec",
      light: "#ffe0fd",
    },
    background: {
      default: "#222222",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    purple: Palette["primary"];
    orange: Palette["primary"];
  }
  interface PaletteOptions {
    purple: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
  }
}
