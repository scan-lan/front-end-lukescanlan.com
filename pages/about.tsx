/** @jsxImportSource @emotion/react */
import Layout from "../components/Layout";
import { getFromAPI } from "../lib/api";
import NavPage from "../types/NavPage";

const About = ({ navPages }) => {
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

export async function getStaticProps() {
  const navPages: { data: NavPage } = await getFromAPI("/nav-pages");

  return {
    props: { navPages: navPages.data },
    revalidate: 1,
  };
}

export default About;
