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

interface Custom404Props {
  navPages: NavPage[] | null;
}

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  return {
    props: { navPages: navPages?.data || null },
  };
};

const seo404: iSeo = {
  metaTitle: "404 | lukescanlan.com",
  metaDescription: "Sorry... 404",
  shareImage: "/error.png",
};

const Custom404 = ({ navPages }: Custom404Props) => (
  <Layout navPages={navPages}>
    <Seo seo={seo404} />
    <ContactContainer>
      <div className="text-one">
        <Typography variant="h2" className="no-break-out">
          Oops—404
        </Typography>
        <Typography>You&apos;re lost.</Typography>
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
        <Typography variant="caption">
          {"(Or I've not finished something I should have.)"}
        </Typography>
      </div>
    </ContactContainer>
  </Layout>
);

export default Custom404;
