import { cn } from "../utils";

interface Props extends JSX.HtmlAnchorTag {
  // TODO: better types this...
  hxHeaders?: Record<string, string>;
}

export const Link = ({
  href,
  children,
  hxHeaders,
  class: className,
  ...p
}: Props) => {
  return (
    <a
      {...p}
      hx-get={href}
      hx-replace-url="true"
      hx-push-url="true"
      hx-headers={hxHeaders ? JSON.stringify(hxHeaders) : undefined}
      hx-target="#main"
      hx-swap="innerHTML"
      class={cn("cursor-pointer", className)}
    >
      {children}
    </a>
  );
};
