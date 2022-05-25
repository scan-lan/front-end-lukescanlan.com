/** @jsxImportSource @emotion/react */

import ContactContainer from "../components/ContactContainer";
import { GetStaticProps } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import Seo from "../components/Seo";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../lib/api";
import iSeo from "../types/Seo";

interface Custom500Props {
  navPages: NavPage[] | null;
}

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  return {
    props: { navPages: navPages?.data || null },
  };
};

const seo500: iSeo = {
  metaTitle: "500 | lukescanlan.com",
  metaDescription: "Sorry... 500",
  shareImage: "/error.png",
};

const Custom500 = ({ navPages }: Custom500Props) => (
  <Layout navPages={navPages}>
    <Seo seo={seo500} />
    <ContactContainer>
      <div className="text-one">
        <Typography variant="h2" className="no-break-out">
          Oops—500
        </Typography>
        <Typography>That means I&apos;ve fucked something up.</Typography>
      </div>
      <div className="image">
        <div
          css={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            src="/error.png"
            alt="A blurry picture of my cat (Frisbee) crying"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="text-two">
        <Typography variant="caption">{"(Sorry.)"}</Typography>
      </div>
    </ContactContainer>
  </Layout>
);

export default Custom500;
