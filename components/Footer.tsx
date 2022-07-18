/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import { Button } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const footerStyles = (theme: Theme) =>
  css({
    display: "grid",
    placeContent: "center",
    borderTop: "2px white dashed",
    color: "#ffffff",
    backgroundColor: theme.palette.primary.main,
    fontWeight: 500,

    ".footer-content": {
      textAlign: "center",
      padding: theme.spacing(2),
      a: {
        color: theme.palette.primary.contrastText,
        textDecorationColor: "#ccc",
        ":hover, :focus": {
          textDecorationColor: theme.palette.primary.contrastText,
        },
      },
    },
  });

const Footer = () => (
  <footer css={footerStyles}>
    <div className="footer-content">
      <Link href="/contact" passHref>
        <Button variant="link">Contact</Button>
      </Link>
      <Typography align="center" variant="body1">
        &copy; Luke Scanlan 2021&ndash;{new Date().getFullYear()}
      </Typography>
    </div>
  </footer>
);

export default Footer;
