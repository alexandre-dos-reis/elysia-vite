import { htmx } from "@gtramontina.com/elysia-htmx";
import Elysia from "elysia";
import { Layout } from "./layouts";
import html from "@elysiajs/html";

export const htmlRoutes = new Elysia()
  .use(html({ autoDetect: true, autoDoctype: true }))
  .use(htmx())
  .onAfterHandle(({ hx, response }) => {
    if (hx.boosted || hx.request) {
      return <>{response}</>;
    }
    return <Layout>{response as any}</Layout>;
  })
  .get("/", () => <h1>Home Page</h1>)
  .get("about", () => <h1>About Page</h1>);
