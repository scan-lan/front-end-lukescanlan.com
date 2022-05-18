/** @jsxImportSource @emotion/react */

import AboutButton from "../components/AboutButton";
import AboutPage from "../types/AboutPage";
import { GetStaticProps } from "next/types";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../lib/api";
import { useState } from "react";

interface AboutProps {
  navPages: NavPage[] | null;
  about: AboutPage | null;
}

const mainStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "1fr min-content 1fr",
    gridTemplateRows: "1fr repeat(3, min-content) 1fr",
    gridTemplateAreas: `
      ". blurb ."
      ". what ."
      "where title why"
      ". who ."
      ". . ."
    `,

    ".align-start": {
      alignSelf: "start",
    },

    ".align-end": {
      alignSelf: "end",
    },

    ".justify-end": {
      justifySelf: "end",
    },

    ".justify-start": {
      justifySelf: "start",
    },

    "#title": {
      gridArea: "title",
      // marginRight: 139,
      // marginLeft: 138,
      // marginBottom: -1,
    },

    "#what": {
      gridArea: "what",
    },

    "#where": {
      gridArea: "where",
    },

    "#why": {
      gridArea: "why",
    },

    "#who": {
      gridArea: "who",
    },

    "#blurb": {
      gridArea: "blurb",
      display: "grid",
      placeContent: "center",
      p: {
        maxWidth: "40ch",
      },
    },

    ".active": {
      backgroundColor: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.main,
      textDecoration: "4px underline",
      ":hover": {
        backgroundColor: theme.palette.secondary.contrastText,
      },
    },
  });

export interface AboutState {
  what: boolean;
  where: boolean;
  why: boolean;
  who: boolean;
}

const getBlurb = (state: AboutState, about: AboutPage) => {
  if (state.what) return about.attributes.what;
  if (state.where) return about.attributes.where;
  if (state.who) return about.attributes.who;
  if (state.why) return about.attributes.why;
  return "";
};

const About = ({ navPages, about }: AboutProps) => {
  const [state, setState] = useState<AboutState>({
    what: false,
    where: false,
    why: false,
    who: false,
  });

  return (
    <Layout navPages={navPages}>
      <main css={mainStyles}>
        <Typography
          variant="h1"
          id="title"
          css={(theme) => ({
            fontFamily: "sans-serif",
            padding: `0 ${theme.spacing(1)}`,
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
            fontVariant: "none",
            // display: "block",
            // WebkitTransform: "scale(2,1)",
            // msTransform: "scale(2,1)",
            // transform: "scale(2,1)",
          })}
        >
          about
        </Typography>
        <AboutButton
          name="what"
          className="align-end justify-end"
          active={state.what}
          setState={setState}
        />
        <AboutButton
          name="where"
          className="align-start justify-end"
          active={state.where}
          setState={setState}
        />
        <AboutButton
          name="why"
          className="align-end justify-start"
          active={state.why}
          setState={setState}
        />
        <AboutButton
          name="who"
          className="justify-start align-start"
          active={state.who}
          setState={setState}
        />
        <Typography variant="body1" id="blurb">
          {about ? getBlurb(state, about) : "tbc"}
        </Typography>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  const about = await getFromAPI<{ data: AboutPage }>("/about");

  return {
    props: { navPages: navPages?.data || null, about: about?.data || null },
    revalidate: 1,
  };
};

export default About;
