/** @jsxImportSource @emotion/react */

import ContactPage from "../types/ContactPage";
import { Email } from "react-obfuscate-email";
import { GetStaticProps } from "next/types";
import Image from "next/image";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import NavPage from "../types/NavPage";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../lib/api";
import { useRouter } from "next/router";

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
      a: {
        color: theme.palette.primary.main,
        textDecoration: `2px ${theme.palette.primary.light} underline`,

        ":hover, :focus": {
          textDecorationColor: theme.palette.primary.dark,
        },
      },
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

const Contact = ({ navPages, contactPage }: ContactProps) => {
  const router = useRouter();

  if (router.isFallback || contactPage === null) {
    return (
      <Layout navPages={navPages}>
        <main css={mainStyles}>
          <div className="blurb">
            <Typography>
              I&apos;m payin 5 quid a month for this email, so make it worth my
              while.
            </Typography>
          </div>
          <div className="email">
            <Typography>
              Click <Email email="luke@lukescanlan.com">here</Email> for my
              email
            </Typography>
          </div>
          <div className="image">
            <Image
              src="/contactPage.jpg"
              alt="Luke in repose at a bridge over white water"
              width={1600}
              height={1200}
              priority
            />
          </div>
        </main>
      </Layout>
    );
  }
  const image = contactPage?.attributes.contactImage.data || null;

  return (
    <Layout navPages={navPages}>
      <main css={mainStyles}>
        <div className="blurb">
          <Markdown>{contactPage.attributes.blurb}</Markdown>
        </div>
        <div className="email">
          <Typography>
            Click <Email email="luke@lukescanlan.com">here</Email> for my email
          </Typography>
        </div>
        <div className="image">
          <Image
            alt=""
            src={image.attributes.formats.xlarge?.url || image.attributes.url}
            width={image.attributes.width}
            height={image.attributes.height}
            priority
          />
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  const contactPage = await getFromAPI<{ data: ContactPage }>("/contact");
  console.log(contactPage);

  return {
    props: {
      navPages: navPages?.data || null,
      contactPage: contactPage?.data || null,
    },
    revalidate: 1,
  };
};

export default Contact;
