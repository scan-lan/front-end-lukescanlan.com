import ApiSEO from "../types/SEO";
import Footer from "./Footer";
import Nav from "./Nav";
import NavPage from "../types/NavPage";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  navPages: NavPage[] | null;
  seo?: ApiSEO;
}

const Layout = ({ children, navPages, seo }: LayoutProps) => (
  <>
    <Nav navPages={navPages} />
    {children}
    <Footer />
  </>
);

export default Layout;
