import { ThemeOptions } from "@mui/material/styles";
import { css } from "@emotion/react"

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#5c7b65",
    },
    secondary: {
      main: "#78909c",
    },
  },
  typography: {
    fontFamily: "Atkinson Hyperlegible, Roboto, sans-serif",
    h1: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 900,
      fontVariant: "small-caps",
    },
    h2: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 900,
      fontVariant: "small-caps",
      paddingBottom: "1.2rem",
    },
    h3: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 700,
      fontVariant: "small-caps",
      paddingTop: ".5rem",
      paddingBottom: "1rem",
    },
    h4: {
      fontFamily: "Roboto Slab, serif",
      fontWeight: 500,
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    h5: {
      fontFamily: "Roboto Slab, serif",
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    h6: {
      fontFamily: "Roboto Slab, serif",
      fontVariant: "small-caps",
      paddingBottom: "1rem",
    },
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.2rem",
    },
    caption: {
      fontSize: "1rem",
      color: "#686868",
      lineHeight: 1,
    },
    button: {
      fontFamily: "Fraunces, Roboto Slab, Serif",
      fontWeight: 700,
      fontSize: "1.25rem",
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
          textTransform: "none",
          borderRadius: 0,
          boxShadow: "none",
          padding: "4px 8px",
          ":hover, :focus, :active": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: {
            variant: "link",
          },
          style: css({
            border: "none",
            textDecoration: "underline",
            fontWeight: "inherit",
            fontFamily: "inherit",
            ":hover": {
              backgroundColor: "inherit",
              textDecoration: "underline"
            }
          })
        }
      ]
    },
    MuiAccordion: {
      defaultProps: {
        sx: {
          boxShadow: "none",
          border: "2px black dashed",
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
};
