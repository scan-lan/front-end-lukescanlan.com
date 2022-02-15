import { ThemeOptions } from "@mui/material";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible",
    h3: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 700,
      fontVariant: "small-caps",
      // fontSize: "48px",
      lineHeight: 0.9,
    },
    body1: {
      fontSize: "20px",
      lineHeight: 1.4,
    },
    caption: {
      fontSize: "16px",
      color: "#686868",
      lineHeight: 1,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
};
