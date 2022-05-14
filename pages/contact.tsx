/** @jsxImportSource @emotion/react */

import ContactPage from "../types/ContactPage";
import { Email } from "react-obfuscate-email";
import { GetStaticProps } from "next/types";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "@mui/material/Link";
import Markdown from "../components/Markdown";
import NavPage from "../types/NavPage";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../lib/api";

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  const contactPage = await getFromAPI<{ data: ContactPage }>("/contact");

  return {
    props: {
      navPages: navPages?.data || null,
      contactPage: contactPage?.data || null,
    },
    revalidate: 1,
  };
};

interface ContactProps {
  navPages: NavPage[] | null;
  contactPage: ContactPage | null;
}

const mainStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gridTemplateRows: "3fr 2fr",

    ".image": {
      gridRow: "1 / span 2",
      display: "grid",
      placeContent: "center",
      margin: `${theme.spacing(1)} 0`,
      padding: `0 ${theme.spacing(1)}`,
      borderRight: "2px black dashed",
    },

    ".blurb": {
      justifySelf: "right",
      alignSelf: "center",
      padding: theme.spacing(1),
      p: {
        maxWidth: "35ch",
      },
      h4: {
        textAlign: "right",
      },
    },

    ".email": {
      height: "100%",
      display: "grid",
      alignContent: "center",
      textAlign: "center",
      padding: `0 ${theme.spacing(1)}`,
      marginRight: theme.spacing(1),
      borderTop: "2px black dashed",
    },

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr 2fr 1fr",

      ".blurb": {
        gridRow: 1,
      },

      ".image": {
        gridRow: 2,
        borderRight: "none",
        borderTop: "2px black dashed",
        padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
        margin: 0,
      },

      ".email": {
        gridRow: 3,
        margin: 0,
      },
    },
  });

const emailStyles = (theme: Theme) =>
  css({
    color: theme.palette.primary.main,
    textDecoration: `2px ${theme.palette.primary.light} underline`,

    ":hover, :focus": {
      textDecorationColor: theme.palette.primary.dark,
    },
  });

const Contact = ({ navPages, contactPage }: ContactProps) => {
  const image = contactPage?.attributes.contactImage.data || null;

  return (
    <Layout navPages={navPages}>
      <main css={mainStyles}>
        <div className="blurb">
          {contactPage ? (
            <Markdown>{contactPage.attributes.blurb}</Markdown>
          ) : (
            <Typography>
              I&apos;m payin 5 quid a month for this email, so make it worth my
              while.
            </Typography>
          )}
        </div>
        <div className="email">
          <Typography>
            Click{" "}
            <Email email="luke@lukescanlan.com" css={emailStyles}>
              here
            </Email>{" "}
            for my email
          </Typography>
        </div>
        <div className="image">
          {image ? (
            <Image
              alt=""
              src={image.attributes.formats.xlarge?.url || image.attributes.url}
              width={image.attributes.width}
              height={image.attributes.height}
              priority
            />
          ) : (
            <Typography>Imagine an image here</Typography>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
