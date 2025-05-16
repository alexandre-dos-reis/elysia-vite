import { PropsWithChildren } from "@kitajs/html";
import { Link } from "../components/Link";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/src/client/styles.css" rel="stylesheet" />
        <script type="module" src="/src/client/index.ts"></script>
      </head>
      <body>
        <nav>
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
        <script src="../../node_modules/preline/dist/preline.js"></script>
      </body>
    </html>
  );
};
