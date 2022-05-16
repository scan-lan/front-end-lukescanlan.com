/** @jsxImportSource @emotion/react */

import ContactContainer from "../components/ContactContainer";
import { GetStaticProps } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import Typography from "@mui/material/Typography";
import { getFromAPI } from "../lib/api";

interface Custom404Props {
  navPages: NavPage[] | null;
}

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");
  return {
    props: { navPages: navPages?.data || null },
  };
};

const Custom404 = ({ navPages }: Custom404Props) => (
  <Layout navPages={navPages}>
    <ContactContainer>
      <div className="text-one">
        <Typography variant="h2">Oops—404</Typography>
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
            src="/404.png"
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
        <Typography variant="caption">
          {"(Or I've not finished something I should have.)"}
        </Typography>
      </div>
    </ContactContainer>
  </Layout>
);

export default Custom404;
