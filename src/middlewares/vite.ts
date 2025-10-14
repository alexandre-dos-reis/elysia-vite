import { Elysia } from "elysia";
import { createServer as viteCreateServer } from "vite";
import { connect } from "elysia-connect-middleware";
import { type render as serverRender } from "../entry-server";

const htmlTemplate = `
<html>
  <head><!--app-head--></head>
  <body>
   <!--app-html-->
   <script type="module" src="/src/entry-client.ts"></script>
  </body>
</html>
`;

export const viteMiddleware = new Elysia({ name: "dev" })
  .state(
    "vite",
    await viteCreateServer({
      server: { middlewareMode: true },
      appType: "custom",
    }),
  )
  .use(async (app) => app.use(connect(app.store.vite.middlewares)))
  .onRequest(async (ctx) => {
    const url = ctx.request.url;
    const template = await ctx.store.vite.transformIndexHtml(url, htmlTemplate);

    const { render } = (await ctx.store.vite.ssrLoadModule(
      "/src/entry-server.tsx",
    )) as { render: typeof serverRender };

    const rendered = render(url);

    return new Response(
      template
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? ""),
      {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  });
