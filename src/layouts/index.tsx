import { PropsWithChildren } from "@kitajs/html";
import { Link } from "../components/Link";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/output.css" />
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      </head>
      <body>
        <nav hx-preserve>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main id="main" class="bg-gray-500">
          {children}
        </main>
      </body>
    </html>
  );
};
