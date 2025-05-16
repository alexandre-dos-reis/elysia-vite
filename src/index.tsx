import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { htmlRoutes } from "./routes";
import { viteMiddleware } from "./middlewares/vite";

new Elysia()
  .use(viteMiddleware)
  .use(
    staticPlugin({
      assets: "public",
      prefix: "assets",
    }),
  )
  .use(htmlRoutes)
  .listen(3000, ({ hostname, port }) => {
    console.log(`Server started http://${hostname}:${port}`);
  });
