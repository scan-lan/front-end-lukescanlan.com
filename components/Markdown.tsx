import ReactMarkdown, { Components } from "react-markdown";

import Link from "@mui/material/Link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@mui/material/Typography";
import remarkGfm from "remark-gfm";

const componentMapping: Components = {
  h1: ({ node, ...props }) => <Typography variant="h2" {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h3" {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h4" {...props} />,
  h4: ({ node, ...props }) => <Typography variant="h5" {...props} />,
  h5: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  h6: ({ node, ...props }) => <Typography variant="h6" {...props} />,
  p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
  a: ({ node, ...props }) => <Link color="primary.main" {...props} />,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const Markdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={componentMapping}
    className="markdown"
  >
    {children}
  </ReactMarkdown>
);

export default Markdown;
