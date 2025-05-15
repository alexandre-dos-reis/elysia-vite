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
        <script type="module" src="/src/client/index.ts"></script>
      </head>
      <body>
        <nav>
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn m-1">
              Click
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
        <main id="main" class="bg-gray-500">
          {children}
        </main>
      </body>
    </html>
  );
};
