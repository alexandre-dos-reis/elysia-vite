import { Elysia } from "elysia";
import { viteMiddleware } from "./middlewares/vite";

const app = new Elysia()
  .use(viteMiddleware)
  .get("/", () => "ok")
  .listen(3000);

console.log(
  `Server started http://${app.server?.hostname}:${app.server?.port}`,
);
