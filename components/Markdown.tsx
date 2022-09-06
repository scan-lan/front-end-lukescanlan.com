import ReactMarkdown, { Components } from "react-markdown"

import Link from "@mui/material/Link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import Typography from "@mui/material/Typography"
import remarkGfm from "remark-gfm"

const componentMapping: Components = {
  h1: ({ className, ...props }) => (
    <Typography
      variant="h2"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <Typography
      variant="h3"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <Typography
      variant="h4"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <Typography
      variant="h5"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <Typography
      variant="h6"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <Typography
      variant="h6"
      className={`no-break-out ${className || ""}`}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <Typography
      variant="body1"
      className={`${className || ""} no-break-out`}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => (
    <Link
      color="primary.main"
      href={href}
      className={`${className || ""} no-break-out`}
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={`${className || ""} no-break-out`} {...props}>
        {children}
      </code>
    )
  },
}

const Markdown = ({ children }: { children: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={componentMapping}
    className="markdown"
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
