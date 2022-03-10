import { ReactNode } from "react";
import NavPage from "../types/NavPage";
import SEO from "../types/SEO";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
  navPages: NavPage[];
  seo?: SEO;
}

const Layout = ({ children, navPages, seo }: LayoutProps) => (
  <>
    <Nav navPages={navPages} />
    {children}
  </>
);

export default Layout;
