/** @jsxImportSource @emotion/react */
import { createRef } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import NavPage from "../types/NavPage";
import NavButton from "./NavButton";

const headerCss = css({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateAreas: `
    "sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename sitename"
    ". navbar navbar navbar navbar navbar navbar navbar navbar navbar navbar ."
  `,
  paddingBottom: 24,

  "& .sitename": {
    border: "1px black dashed",
    gridArea: "sitename",
  },

  "& h1": {
    lineHeight: 0.9,
    paddingTop: "1.3rem",
  },

  "& nav": {
    gridArea: "navbar",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    paddingTop: 8,
    "@media (max-width: 800px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    "@media (max-width: 400px)": {
      gridTemplateRows: "repeat(4, 1fr)",
      gridTemplateColumns: "1fr",
    },
  },
});

const Nav = ({ navPages }: { navPages: NavPage[] }) => {
  const siteName = createRef<HTMLDivElement>();
  return (
    <header css={headerCss}>
      <div className="sitename" ref={siteName}>
        <Typography variant="h1">
          <Link href="/" passHref>
            <a>
              <svg height={82} width={800}>
                <text
                  x="0"
                  y="80"
                  fill="none"
                  stroke="black"
                  strokeDasharray="5,5"
                  fontSize="96px"
                >
                  lukescanlan.com
                </text>
              </svg>
            </a>
          </Link>
        </Typography>
      </div>
      <nav>
        {navPages.map((navPage, i) => (
          <Link href={navPage.attributes.slug} key={i} passHref>
            <NavButton text={navPage.attributes.name} />
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Nav;
