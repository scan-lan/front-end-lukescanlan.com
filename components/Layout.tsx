import ApiSEO from "../types/SEO";
import Nav from "./Nav";
import NavPage from "../types/NavPage";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  navPages: NavPage[];
  seo?: ApiSEO;
}

const Layout = ({ children, navPages, seo }: LayoutProps) => (
  <>
    <Nav navPages={navPages} />
    {children}
  </>
);

export default Layout;
