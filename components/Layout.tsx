import { ReactNode } from "react";
import Category from "../types/Category";
import SEO from "../types/SEO";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
  categories: Category[];
  seo?: SEO;
}

const Layout = ({ children, categories, seo }: LayoutProps) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;
