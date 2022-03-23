/** @jsxImportSource @emotion/react */

import { Theme, css } from "@emotion/react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

interface AccordionProps {
  contentWarning?: string;
  authorsNote?: string;
}
const borderStyle = "2px black dashed";
const accordionStyles = (theme: Theme) =>
  css({
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    paddingBottom: theme.spacing(3),

    "& .accordion-row": {
      fontSize: "1.4rem",
      maxWidth: "55ch",
      width: "100%",
      justifySelf: "center",
      gridColumn: "3 / span 8",

      [theme.breakpoints.down("lg")]: {
        gridColumn: "2 / span 10",
        fontSize: "1.35rem",
      },

      [theme.breakpoints.down("md")]: {
        fontSize: "1.2rem",
      },

      "&::before, &.Mui-expanded::before": {
        opacity: 0,
      },

      ":last-child": {
        borderTop: "none",
      },

      "&:first-child": {
        borderTop: borderStyle,
      },

      ":first-child.Mui-expanded + :last-child, :first-child + :last-child.Mui-expanded":
        {
          borderTop: borderStyle,
        },
    },

    ".highlight": {
      backgroundColor: theme.palette.warning.light,
      color: "black",
    },
  });

const PrefaceAccordion = ({ contentWarning, authorsNote }: AccordionProps) => (
  <div css={accordionStyles}>
    {contentWarning ? (
      <Accordion className="accordion-row highlight">
        <AccordionSummary>
          <Typography
            variant="h5"
            css={{
              lineHeight: 1,
              padding: 0,
            }}
          >
            &#9888; Content warning
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">{contentWarning}</Typography>
        </AccordionDetails>
      </Accordion>
    ) : null}
    {authorsNote ? (
      <Accordion className="accordion-row">
        <AccordionSummary>
          <Typography
            variant="h5"
            css={{
              lineHeight: 1,
              padding: 0,
            }}
          >
            Author&apos;s note
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">{authorsNote}</Typography>
        </AccordionDetails>
      </Accordion>
    ) : null}
  </div>
);

export default PrefaceAccordion;
