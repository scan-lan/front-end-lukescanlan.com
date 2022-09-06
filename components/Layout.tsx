/** @jsxImportSource @emotion/react */

import ApiSeo from "../types/ApiSeo"
import Footer from "./Footer"
import Nav from "./Nav"
import NavPage from "../types/NavPage"
import { ReactNode } from "react"
import { css } from "@emotion/react"

interface LayoutProps {
  children: ReactNode
  navPages: NavPage[] | null
  seo?: ApiSeo
}

const layoutStyles = () =>
  css({
    display: "grid",
    gridTemplateRows: "min-content 1fr min-content",
    height: "100%",
  })

const Layout = ({ children, navPages }: LayoutProps) => (
  <div css={layoutStyles}>
    <Nav navPages={navPages} />
    <>{children}</>
    <Footer />
  </div>
)

export default Layout
