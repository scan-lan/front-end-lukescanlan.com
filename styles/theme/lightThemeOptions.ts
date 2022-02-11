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
    h4: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 900,
      fontVariant: "small-caps",
      fontSize: "48px",
    },
    caption: {
      fontSize: "18px",
      color: "#808080",
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
