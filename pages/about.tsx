/** @jsxImportSource @emotion/react */
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { getFromAPI } from "../lib/api";
import NavPage from "../types/NavPage";

interface AboutProps {
  navPages: NavPage[];
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
  const navPages: { data: NavPage } = await getFromAPI("/nav-pages");

  return {
    props: { navPages: navPages.data },
    revalidate: 1,
  };
};

export default About;
