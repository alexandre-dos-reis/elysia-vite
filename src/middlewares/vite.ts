import { Elysia } from "elysia";
import { createServer as viteCreateServer } from "vite";
import { connect } from "elysia-connect-middleware";
import { htmx } from "@gtramontina.com/elysia-htmx";

export const devMiddleware = new Elysia({ name: "dev" })
  .use(htmx())
  .state(
    "vite",
    await viteCreateServer({
      server: { middlewareMode: true },
      appType: "custom",
    }),
  )
  .use(async (app) => app.use(connect(app.store.vite.middlewares)))
  .onAfterHandle((ctx) => {
    return ctx.store.vite.transformIndexHtml(ctx.path, ctx.response as any);
  });
