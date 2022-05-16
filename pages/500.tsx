/** @jsxImportSource @emotion/react */

import ContactContainer from "../components/ContactContainer";
import { GetStaticProps } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../lib/api";

interface Custom500Props {
  navPages: NavPage[] | null;
}

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  return {
    props: { navPages: navPages?.data || null },
  };
};

const Custom500 = ({ navPages }: Custom500Props) => (
  <Layout navPages={navPages}>
    <ContactContainer>
      <div className="text-one">
        <Typography variant="h2">Oops—500</Typography>
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
            width={1800}
            height={1200}
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
