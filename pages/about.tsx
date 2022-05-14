/** @jsxImportSource @emotion/react */

import { GetStaticProps } from "next/types";
import Layout from "../components/Layout";
import NavPage from "../types/NavPage";
import { getFromAPI } from "../lib/api";

interface AboutProps {
  navPages: NavPage[] | null;
}

const About = ({ navPages }: AboutProps) => {
  return (
    <Layout navPages={navPages}>
      <div
        css={{
          height: "70vh",
          display: "grid",
          placeContent: "center",
        }}
      >
        <h1>W.I.P.</h1>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const navPages = await getFromAPI<{ data: NavPage[] }>("/nav-pages");

  return {
    props: { navPages: navPages?.data || null },
    revalidate: 1,
  };
};

export default About;
