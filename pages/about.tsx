/** @jsxImportSource @emotion/react */

import AboutButton from "../components/AboutButton";
import AboutPage from "../types/AboutPage";
import AboutTitle from "../components/AboutTitle";
import { GetStaticProps } from "next/types";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import NavPage from "../types/NavPage";
import Seo from "../components/Seo";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { getFromAPI } from "../lib/api";
import { stringify } from "qs";
import { useState } from "react";
import useWindowDimensions from "../lib/useWindowDimensions";

interface AboutProps {
  navPages: NavPage[] | null;
  about: AboutPage | null;
}

const mainStyles = (theme: Theme) =>
  css({
    gridColumn: "2 / span 10",
    padding: theme.spacing(1, 0),
    display: "grid",
    gridTemplateColumns: "1fr min-content 1fr",
    gridTemplateRows: "1fr repeat(3, min-content) 1fr",
    gridTemplateAreas: `
      "blurb blurb blurb"
      ". what ."
      "why title who"
      ". where ."
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
    },

    "#what": {
      gridArea: "what",
      marginTop: theme.spacing(1),
    },

    "#why": {
      gridArea: "why",
    },

    "#who": {
      gridArea: "who",
    },

    "#where": {
      gridArea: "where",
      marginBottom: theme.spacing(1),
    },

    "#blurb": {
      gridArea: "blurb",
      display: "grid",
      placeContent: "center",
      padding: theme.spacing(0, 0.5),
      p: {
        maxWidth: "45ch",
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
  const windowDimensions = useWindowDimensions();

  return (
    <Layout navPages={navPages}>
      <Seo seo={about?.attributes.seo || null} />
      <div className="twelve-column">
        <main css={mainStyles}>
          <AboutTitle textLength={windowDimensions.width * 0.4} />
          <AboutButton
            name="what"
            active={state.what}
            className="align-end justify-end"
            setState={setState}
          />
          <AboutButton
            name="why"
            active={state.why}
            className="align-start justify-end"
            setState={setState}
          />
          <AboutButton
            name="who"
            active={state.who}
            className="align-end justify-start"
            setState={setState}
          />
          <AboutButton
            name="where"
            active={state.where}
            className="justify-start align-start"
            setState={setState}
          />
          <div id="blurb">
            {about ? (
              <Markdown>{getBlurb(state, about)}</Markdown>
            ) : (
              <Typography variant="body1">tbc</Typography>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const aboutQuery = stringify({
    populate: ["seo.shareImage"],
  });
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  const about = await getFromAPI<{ data: AboutPage }>("/about", aboutQuery);

  return {
    props: { navPages: navPages?.data || null, about: about?.data || null },
    revalidate: 1,
  };
};

export default About;
