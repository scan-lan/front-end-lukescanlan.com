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
    h1: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 900,
    },
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
    button: {
      fontFamily: "Fraunces, Roboto Slab, Serif",
      fontWeight: 700,
      fontSize: "20px",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          border: "2px white dashed",
          borderRadius: 0,
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
};
